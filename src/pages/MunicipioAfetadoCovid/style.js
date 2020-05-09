import styled from 'styled-components/native';

export const Page = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`;

export const HeaderText = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: #e3a038;
  margin-top: 15px;
`;
export const ResultTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #e3a038;
  margin-top: 20px;
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
  margin-top: 30px;
  background-color: #eee;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 10%;
  padding-bottom: 20%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ResultItem = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const ResultInfo = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ResultTitleInfo = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #e3a038;
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
