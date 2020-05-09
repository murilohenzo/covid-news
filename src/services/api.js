import axios from 'axios';

export default function useCovid() {
  return {
    async getSituationByCounty(data, idMunicipio) {
      return await axios.get(
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-por-tipo?data=${data}&tipo=Confirmado&idMunicipio=${idMunicipio}`,
      );
    },
    async getConfirmedTotal(data) {
      return await axios.get(
        `https://indicadores.integrasus.saude.ce.gov.br/api/coronavirus/qtd-municipios-casos-confirmados?data=${data}&tipo=Confirmado&idMunicipio=`,
      );
    },
  };
}
