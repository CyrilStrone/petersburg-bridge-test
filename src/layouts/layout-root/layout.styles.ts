import styled from 'styled-components';

export const RubyUpdateApp = styled.button`
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 10;
  padding: 8px 14px;
  border: 1px solid ${(props) => props.theme.colors.white[100]};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.other.bb20a2};
  color: ${(props) => props.theme.colors.white[100]};
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
