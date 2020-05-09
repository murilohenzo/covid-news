/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import useCovid from '../../services/api';
import {
  Page,
  HeaderText,
  InputData,
  ResultArea,
  ResultItem,
  ResultTitle,
  ResultInfo,
  ResultTitleInfo,
  ResultTotalInfo,
} from './style';
import {FlatList} from 'react-native-gesture-handler';

function MunicipioAfetadoCovid() {
  const [situationByCounty, setSituationByCounty] = useState([]);
  const [confirmedTotal, setConfirmedTotal] = useState([]);
  const [data, setData] = useState('');
  const [idMunicipio, setIdMunicipio] = useState('');

  const {getSituationByCounty, getConfirmedTotal} = useCovid();

  const getDataCounty = () => {
    getSituationByCounty(data, idMunicipio).then((e) =>
      setSituationByCounty(e.data),
    );
  };

  const getDataConfirmedTotal = () => {
    getConfirmedTotal(data).then((e) => setConfirmedTotal(e.data));
  };

  useEffect(() => {
    getDataCounty(), getDataConfirmedTotal();
  }, [data, idMunicipio]);

  return (
    <Page>
      <HeaderText>Dados da Covid-19</HeaderText>
      <InputData
        placeholder="data"
        keyboardType="number-pad"
        onChangeText={(e) => setData(e)}
      />
      <InputData
        placeholder="Id Municipio"
        keyboardType="number-pad"
        onChangeText={(e) => setIdMunicipio(e)}
      />
      <ResultInfo>
        <ResultTitle>
          Quantidade Total de Municípios afetados pelo Covid-19
        </ResultTitle>
        <ResultTotalInfo>
          {confirmedTotal.map((item, index) => (
            <ResultTotalInfo key={index}>
              {item.tipo}: {item.quantidade}
            </ResultTotalInfo>
          ))}
        </ResultTotalInfo>
      </ResultInfo>
      <ResultArea>
        {idMunicipio == '' ? (
          <ResultInfo>
            <ResultTitleInfo>Dados Gerais dos Municípios</ResultTitleInfo>
          </ResultInfo>
        ) : (
          <ResultInfo>
            <ResultTitleInfo>Dados Gerais do Municipio:</ResultTitleInfo>
            <ResultTitleInfo>{idMunicipio}</ResultTitleInfo>
          </ResultInfo>
        )}
        <FlatList
          onRefresh={() => getDataCounty()}
          data={situationByCounty}
          renderItem={({item, index}) =>
            index < 4 && (
              <ResultItem key={index}>
                {item.tipo}: {item.quantidade}
              </ResultItem>
            )
          }
          keyExtractor={(index) => toString(index)}
        />
      </ResultArea>
    </Page>
  );
}

export default MunicipioAfetadoCovid;
