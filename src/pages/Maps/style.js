import styled from 'styled-components/native';

export const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
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
