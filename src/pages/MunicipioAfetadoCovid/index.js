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
import {FlatList} from 'react-native';

function MunicipioAfetadoCovid() {
  const [situationByCounty, setSituationByCounty] = useState([]);

  const [confirmedTotal, setConfirmedTotal] = useState([]);

  const [date, setDate] = useState(getCurrentDate);

  const [idMunicipio, setIdMunicipio] = useState('');

  const {getSituationByCounty, getConfirmedTotal} = useCovid();

  const getDataCounty = () => {
    getSituationByCounty(date, idMunicipio).then((e) =>
      setSituationByCounty(e.data),
    );
  };

  const getDataConfirmedTotal = () => {
    getConfirmedTotal(date).then((e) => setConfirmedTotal(e.data));
  };

  const getCurrentDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    getDataCounty(), getDataConfirmedTotal();
  }, [date, idMunicipio]);

  return (
    <Page>
      <HeaderText>Dados da Covid-19</HeaderText>
      <InputData
        placeholder="data"
        keyboardType="number-pad"
        onChangeText={(e) => setDate(e)}
      />
      <InputData
        placeholder="Id Municipio"
        keyboardType="number-pad"
        onChangeText={(e) => setIdMunicipio(e)}
      />
      <ResultInfo>
        <ResultTitle>Municípios do CE afetados pela Covid-19</ResultTitle>
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
          <>
            <ResultTitleInfo>Dados Gerais dos Municípios</ResultTitleInfo>
          </>
        ) : (
          <>
            <ResultTitleInfo>Dados Gerais do Municipio:</ResultTitleInfo>
            <ResultTitleInfo>{idMunicipio}</ResultTitleInfo>
          </>
        )}
        <FlatList
          refreshing={false}
          onRefresh={() => getDataCounty()}
          data={situationByCounty}
          renderItem={({item, index}) =>
            index < 4 && (
              <ResultItem key={toString(index)}>
                {item.tipo}: {item.quantidade}
              </ResultItem>
            )
          }
          keyExtractor={(item, index) => toString(index)}
        />
      </ResultArea>
    </Page>
  );
}

export default MunicipioAfetadoCovid;
