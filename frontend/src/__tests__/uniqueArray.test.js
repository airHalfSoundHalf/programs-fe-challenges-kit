import uniqueArray from "../utils/uniqueArray"

describe('uniqueArray.js', () => {
    test('중복 제거 확인', () => {
        expect(uniqueArray([0, 1, 1])).toStrictEqual([0, 1])
    })

    test('중복 제거 확인 string', () => {
        expect(uniqueArray(['가', '나', '나', '다'])).toStrictEqual(['가', '나', '다'])
    })
})