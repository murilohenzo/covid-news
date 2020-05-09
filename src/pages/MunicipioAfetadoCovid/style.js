import styled from 'styled-components/native';

export const Page = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fff;
`;

export const HeaderText = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: #e103f6;
  margin-top: 15px;
`;
export const ResultTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  align-items: center;
`;
export const InputData = styled.TextInput`
  width: 50%;
  height: 40px;
  font-size: 15px;
  background-color: #eee;
  margin-top: 15px;
  border-radius: 10px;
  padding: 10px;
`;

export const ResultArea = styled.View`
  width: 90%;
  height: 45%;
  margin-top: 30px;
  background-color: #eee;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 10%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
`;

export const ResultItem = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const ResultInfo = styled.View`
  width: 90%;
  margin-top: 25px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #eee;
  border-radius: 5px;
`;

export const ResultTitleInfo = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #e103f6;
`;

export const ResultTotalInfo = styled.Text`
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
