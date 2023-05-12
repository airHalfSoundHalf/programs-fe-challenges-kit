const config = {
    // 엔드포인트
    API_ENDPOINT: 'http://localhost:4001',

    // 에러코드
    REQUEST_ERROR: {
        504: {errorCode: 504, message: `${504}: 통신지연으로 서버요청 실패입니다.`},
        500: {errorCode: 500, message: `${500}: 서버요청 실패입니다.`},
        404: {errorCode: 404, message: `${404}: 페이지를 찾을 수 없습니다.`},
        400: {errorCode: 400, message: `${400}: 잘못된 요청입니다.`}
    },
    
    // 데이터관리 By 에러코드
    setValueByStatusCode: (errorCode) => {
        switch (errorCode) {
            case 504:
                return {data: null}
            case 500:
                return {data: null}
            case 404:
                return
            case 400:
                return {data: {}}
        }
    }
}

export default config