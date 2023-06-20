export function getErrorMessage(error: any, customMessage?: string) {
  const status = error?.response?.status;
  switch (status) {
    case 401:
      return `${customMessage} 로그인을 해주세요`;
    default:
      return customMessage ? `${customMessage}` : "에러가 발생하였습니다.";
  }
}
