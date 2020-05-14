/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
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
  const inputIdMunicipioRef = useRef();

  const [nameMunicipio, setNameMunicipio] = useState('');

  const [dataCountySuspect, setDataCountySuspect] = useState([]);

  const [dataCountyExams, setDataCountyExams] = useState([]);

  const [dataCountyConfirmed, setDataCountyConfirmed] = useState([]);

  const [dataCountyRecovered, setDataCountyRecovered] = useState([]);

  const [dataCountyDeath, setDataCountyDeath] = useState([]);

  const [confirmedTotal, setConfirmedTotal] = useState([]);

  const [municipiosOptions, setMunicipiosOptions] = useState([]);

  const [date, setDate] = useState(getCurrentDate);

  const [idMunicipio, setIdMunicipio] = useState('');

  const {
    getDeathByCounty,
    getConfirmdByCounty,
    getConfirmedTotal,
    getSuspectByCounty,
    getExamsByCounty,
    getRecoveredByCounty,
    getNameMunicipios,
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

  const getDataCountyRecovered = () => {
    getRecoveredByCounty(date, idMunicipio).then((e) => {
      setDataCountyRecovered(e.data);
    });
  };

  const getDataNameMunicipios = () => {
    getNameMunicipios(date).then((e) => {
      setMunicipiosOptions(e.data);
    });
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
    ...dataCountyRecovered,
    ...dataCountyDeath,
  ];

  const getIdByName = () => {
    const municipiosFiltered = municipiosOptions.filter(
      (municipio) => municipio.municipio === nameMunicipio.toUpperCase(),
    );
    console.log(municipiosFiltered);
    if (municipiosFiltered.length > 0) {
      setIdMunicipio(municipiosFiltered[0].idMunicipio);
    } else {
      setIdMunicipio('');
    }
  };

  const getCurrentDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    return `${year}-0${month}-${date}`;
  };

  useEffect(() => {
    getDataCountyConfirmed();
    getDataCountyDeath();
    getDataCountySuspect();
    getDataCountyExams();
    getDataCountyRecovered();
    getDataConfirmedTotal();
    getDataNameMunicipios();
  }, [idMunicipio]);

  return (
    <Page>
      <HeaderText>Dados da Covid-19</HeaderText>
      <InputData
        placeholder={`Data atual ${getCurrentDate()}`}
        keyboardType="number-pad"
        onChangeText={(e) => setDate(e)}
        returnKeyType="next"
        onSubmitEditing={() => inputIdMunicipioRef.current.focus()}
      />
      <InputData
        placeholder="Nome do Município"
        keyboardType="email-address"
        onChangeText={(e) => setNameMunicipio(e)}
        autoCapitalize="words"
        returnKeyType="send"
        onSubmitEditing={getIdByName}
        ref={inputIdMunicipioRef}
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
            <ResultTitleInfo>{nameMunicipio.toUpperCase()}</ResultTitleInfo>
          </>
        )}
        <FlatList
          refreshing={false}
          onRefresh={() => fullData()}
          data={fullData}
          renderItem={({item, index}) => (
            <ResultItem key={toString(index)}>
              {item.tipo}: {item.quantidade}
            </ResultItem>
          )}
          keyExtractor={(item, index) => toString(index)}
        />
      </ResultArea>
    </Page>
  );
}

export default MunicipioAfetadoCovid;
