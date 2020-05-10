import axios from 'axios';

export default function useCovid() {
  return {
    async getDeathByCounty(data, idMunicipio) {
      return await axios.get(
        // `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-por-tipo?data=${data}&tipo=Confirmado&idMunicipio=${idMunicipio}`,
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-obitos?data=${data}&tipo=Confirmado&idMunicipio=${idMunicipio}`,
      );
    },
    async getSuspectByCounty(data, idMunicipio) {
      return await axios.get(
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-suspeitos?data=${data}&tipo=Confirmado&idMunicipio=${idMunicipio}`,
      );
    },
    async getExamsByCounty(data, idMunicipio) {
      return await axios.get(
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-exames?data=${data}&tipo=Confirmado&idMunicipio=${idMunicipio}`,
      );
    },
    async getConfirmdByCounty(data, idMunicipio) {
      return await axios.get(
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-por-faixa-etaria-sexo?data=${data}&tipo=Confirmado&idMunicipio=${idMunicipio}`,
      );
    },
    async getConfirmedTotal(data) {
      return await axios.get(
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-municipios-casos-confirmados?data=${data}&tipo=Confirmado&idMunicipio=`,
      );
    },
  };
}
