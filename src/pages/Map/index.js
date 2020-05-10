/* eslint-disable react-hooks/exhaustive-deps */
'use strict';
import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {Page} from './style';
import useLocalization from '../../services/map';

import axios from 'axios';

function Map() {
  const {getLocalizationGeocode} = useLocalization();

  const [loading, setLoading] = useState(false);

  const [localizacoes, setLocalizacoes] = useState([]);

  const getCurrentDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    return `${year}-${month}-${date}`;
  };

  const getDataLocalization = async () => {
    setLoading(true);
    await axios
      .get(
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-por-municipio?data=${getCurrentDate()}&tipo=Confirmado&idMunicipio=`,
      )
      .then((response) => {
        const municipios = response.data.map((item) => {
          return item;
        });

        if (municipios.length > 0) {
          const municipiosCoordenadas = municipios.map(async (municipio) => {
            const informations = await getLocalizationGeocode(
              municipio.municipio,
            );

            if (
              informations.data.results.length > 0 &&
              informations.data.results[0].geometry
            ) {
              const {lat, lng} = informations.data.results[0].geometry.location;
              return {
                nome: municipio.municipio,
                idMunicipio: municipio.idMunicipio,
                tipo: municipio.tipo,
                qtdConfirmados: municipio.quantidade,
                latitude: lat,
                logintude: lng,
              };
            } else {
              return {
                nome: municipio,
                idMunicipio: 0,
                tipo: 0,
                qtdConfirmados: 0,
                latitude: 0,
                logintude: 0,
              };
            }
          });

          const MunicipiosEncontrados = Promise.all(municipiosCoordenadas).then(
            (completed) => {
              const MunicipiosFiltrados = completed.filter(
                (municipio) => municipio.latitude || municipio.longitude,
              );
              setLocalizacoes(MunicipiosFiltrados);
              setLoading(false);
            },
          );
        }
      });

    getLocalizationGeocode().then((e) => {
      if (e.data.results.length > 0 && e.data.results[0].geometry) {
        const {lat, lng} = e.data.results[0].geometry.location;
        console.log(lat);
        console.log(lng);
      }
    });
  };

  useEffect(() => {
    getDataLocalization();
  }, []);

  return (
    <>
      {loading ? (
        <Page>
          <ActivityIndicator color="red" size="small" />
        </Page>
      ) : (
        <MapView
          style={{flex: 1}}
          zoomEnabled={true}
          initialRegion={{
            latitude: -3.7900894,
            longitude: -38.6590335,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}>
          {localizacoes.map((localizacao) => (
            <Marker
              key={localizacao.nome}
              coordinate={{
                latitude: localizacao.latitude,
                longitude: localizacao.logintude,
              }}
              title={localizacao.nome}>
              <Callout>
                <View style={{backgroundColor: '#FFF'}}>
                  <Text>Nome: {localizacao.nome}</Text>
                  <Text>Id Municipio: {localizacao.idMunicipio}</Text>
                  <Text>Tipo: {localizacao.tipo}</Text>
                  <Text>Qtd de Confirmados: {localizacao.qtdConfirmados}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </>
  );
}

export default Map;

// <MapView
//   region={{
//     latitude: -10.0827679,
//     longitude: -57.9804226,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }}>
//   {localizacoes.map((localizacao) => (
//     <Marker
//       coordinate={{
//         latitude: localizacao.latitude,
//         longitude: localizacao.longitude,
//       }}
//       title={localizacao.municipio}
//     />
//   ))}
// </MapView>
