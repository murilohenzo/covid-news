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
  const [dataCountySuspect, setDataCountySuspect] = useState([]);

  const [dataCountyExams, setDataCountyExams] = useState([]);

  const [dataCountyConfirmed, setDataCountyConfirmed] = useState([]);

  const [dataCountyDeath, setDataCountyDeath] = useState([]);

  const [confirmedTotal, setConfirmedTotal] = useState([]);

  const [date, setDate] = useState(getCurrentDate);

  const [idMunicipio, setIdMunicipio] = useState('');

  const {
    getDeathByCounty,
    getConfirmdByCounty,
    getConfirmedTotal,
    getSuspectByCounty,
    getExamsByCounty,
  } = useCovid();

  const getDataCountyDeath = () => {
    getDeathByCounty(date, idMunicipio).then((e) => setDataCountyDeath(e.data));
  };

  const getDataConfirmedTotal = () => {
    getConfirmedTotal(date).then((e) => setConfirmedTotal(e.data));
  };

  const getDataCountySuspect = () => {
    getSuspectByCounty(date, idMunicipio).then((e) =>
      setDataCountySuspect(e.data),
    );
  };

  const getDataCountyExams = () => {
    getExamsByCounty(date, idMunicipio).then((e) => setDataCountyExams(e.data));
  };

  const getDataCountyConfirmed = () => {
    getConfirmdByCounty(date, idMunicipio).then((e) =>
      setDataCountyConfirmed(e.data),
    );
  };

  let confirmeds = [
    {
      tipo: 'Confirmados',
      quantidade: dataCountyConfirmed
        .map((e, i) => e.quantidade)
        .reduce((a, b) => a + b, 0),
    },
  ];

  let fullData = [
    ...dataCountySuspect,
    ...dataCountyExams,
    ...confirmeds,
    ...dataCountyDeath,
  ];

  const getCurrentDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    getDataCountyConfirmed(),
      getDataCountyDeath(),
      getDataCountySuspect(),
      getDataCountyExams(),
      getDataConfirmedTotal();
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
          onRefresh={() => getDataCountyDeath()}
          data={fullData}
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
