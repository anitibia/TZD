let currentFileContent = '';

// Функция для чтения файла с сохранением переносов строк
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Сохраняем содержимое как есть, включая переносы строк
        currentFileContent = e.target.result;
        
        // Для отображения в textarea заменяем переносы на видимые символы
        const displayContent = currentFileContent.replace(/\n/g, "\\n");
        document.getElementById('text').value = displayContent;
    };
    reader.readAsText(file);
}

// Функция для скачивания результата
function downloadResult() {
    let result = document.getElementById('result').value;
    if (!result) {
        document.getElementById('message-text').innerText = 'Нет данных для скачивания';
        document.getElementById('message-box').removeAttribute('hidden');
        return;
    }
    
    // Заменяем видимые "\n" на настоящие переносы строк
    result = result.replace(/\\n/g, '\n');
    
    // Если был использован шифровальный режим с "ПС"
    if (result.includes('ПС')) {
        result = textToPoint(result.toLowerCase());
    }
    
    // Создаем Blob с указанием кодировки UTF-8
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Создаем и запускаем временную ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result_' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(a);
    a.click();
    
    // Убираем ссылку и освобождаем память
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Добавить обработчик события
document.getElementById('file-input').addEventListener('change', handleFileUpload);

function hexToBytes(text) {
    let includAlphabet = "0123456789abcdef";
    let result = new Uint8Array(text.length / 2);
    
    for (let i = 0; i < text.length / 2; i++) {
        let letter1 = text[i * 2];
        let letter2 = text[i * 2 + 1];
        if (includAlphabet.includes(letter1) && includAlphabet.includes(letter2)) {
            let num1 = includAlphabet.indexOf(letter1);
            let num2 = includAlphabet.indexOf(letter2);
            result[i] = (num1 << 4) | num2;
        }
    }
    
    return result;
}
    //функция преобразования байтового массива в хекс
    
function bytesToHex(bytes) {
    let result = "";
    let validAlphabet = "0123456789abcdef";
    
    for (let i = 0; i < bytes.length; i++) {
        let num1 = (bytes[i] & 0xf0) >> 4;
        let num2 = bytes[i] & 0x0f;
        let letter1 = validAlphabet[num1];
        let letter2 = validAlphabet[num2];
        result += letter1.toString() + letter2.toString();
    }
    
    return result;
}

function pointToText(text) {
    let finalText = text
        .replaceAll('0', 'аноль')
        .replaceAll('1', 'аодин')
        .replaceAll('2', 'адва')
        .replaceAll('3', 'атри')
        .replaceAll('4', 'ачетыре')
        .replaceAll('5', 'апять')
        .replaceAll('6', 'ашесть')
        .replaceAll('7', 'асемь')
        .replaceAll('8', 'авосемь')
        .replaceAll('9', 'адевять')
        .replaceAll('.','ТЧК')
        .replaceAll('Ё','Е')
        .replaceAll(',','ЗПТ')
        .replaceAll('-','ТРЗ')
        .replaceAll(' ','ПРБ')
        .replaceAll(':','ДВЗ')
        .replaceAll('?','ВПЗ')
        .replaceAll('!','ВСЗ')
        .replaceAll('\n','ПС');
    return finalText;
}

function textToPoint(text) {
    let finalText = text
        .replaceAll('аноль', '0')
        .replaceAll('аодин', '1')
        .replaceAll('адва', '2')
        .replaceAll('атри', '3')
        .replaceAll('ачетыре', '4')
        .replaceAll('апять', '5')
        .replaceAll('ашесть', '6')
        .replaceAll('асемь', '7')
        .replaceAll('авосемь', '8')
        .replaceAll('адевять', '9')
        .replaceAll('тчк','.')
        .replaceAll('зпт',',')
        .replaceAll('трз','-')
        .replaceAll('двз',':')
        .replaceAll('прб',' ')
        .replaceAll('впз','?')
        .replaceAll('всз','!')
        .replaceAll('пс','\n');
    return finalText;
}

function closeMessageBox() {
    document.getElementById('message-box').setAttribute('hidden', true);
}


const S = [
    0xFC, 0xEE, 0xDD, 0x11, 0xCF, 0x6E, 0x31, 0x16, 0xFB, 0xC4, 0xFA, 0xDA, 0x23, 0xC5, 0x04, 0x4D,
    0xE9, 0x77, 0xF0, 0xDB, 0x93, 0x2E, 0x99, 0xBA, 0x17, 0x36, 0xF1, 0xBB, 0x14, 0xCD, 0x5F, 0xC1,
    0xF9, 0x18, 0x65, 0x5A, 0xE2, 0x5C, 0xEF, 0x21, 0x81, 0x1C, 0x3C, 0x42, 0x8B, 0x01, 0x8E, 0x4F,
    0x05, 0x84, 0x02, 0xAE, 0xE3, 0x6A, 0x8F, 0xA0, 0x06, 0x0B, 0xED, 0x98, 0x7F, 0xD4, 0xD3, 0x1F,
    0xEB, 0x34, 0x2C, 0x51, 0xEA, 0xC8, 0x48, 0xAB, 0xF2, 0x2A, 0x68, 0xA2, 0xFD, 0x3A, 0xCE, 0xCC,
    0xB5, 0x70, 0x0E, 0x56, 0x08, 0x0C, 0x76, 0x12, 0xBF, 0x72, 0x13, 0x47, 0x9C, 0xB7, 0x5D, 0x87,
    0x15, 0xA1, 0x96, 0x29, 0x10, 0x7B, 0x9A, 0xC7, 0xF3, 0x91, 0x78, 0x6F, 0x9D, 0x9E, 0xB2, 0xB1,
    0x32, 0x75, 0x19, 0x3D, 0xFF, 0x35, 0x8A, 0x7E, 0x6D, 0x54, 0xC6, 0x80, 0xC3, 0xBD, 0x0D, 0x57,
    0xDF, 0xF5, 0x24, 0xA9, 0x3E, 0xA8, 0x43, 0xC9, 0xD7, 0x79, 0xD6, 0xF6, 0x7C, 0x22, 0xB9, 0x03,
    0xE0, 0x0F, 0xEC, 0xDE, 0x7A, 0x94, 0xB0, 0xBC, 0xDC, 0xE8, 0x28, 0x50, 0x4E, 0x33, 0x0A, 0x4A,
    0xA7, 0x97, 0x60, 0x73, 0x1E, 0x00, 0x62, 0x44, 0x1A, 0xB8, 0x38, 0x82, 0x64, 0x9F, 0x26, 0x41,
    0xAD, 0x45, 0x46, 0x92, 0x27, 0x5E, 0x55, 0x2F, 0x8C, 0xA3, 0xA5, 0x7D, 0x69, 0xD5, 0x95, 0x3B,
    0x07, 0x58, 0xB3, 0x40, 0x86, 0xAC, 0x1D, 0xF7, 0x30, 0x37, 0x6B, 0xE4, 0x88, 0xD9, 0xE7, 0x89,
    0xE1, 0x1B, 0x83, 0x49, 0x4C, 0x3F, 0xF8, 0xFE, 0x8D, 0x53, 0xAA, 0x90, 0xCA, 0xD8, 0x85, 0x61,
    0x20, 0x71, 0x67, 0xA4, 0x2D, 0x2B, 0x09, 0x5B, 0xCB, 0x9B, 0x25, 0xD0, 0xBE, 0xE5, 0x6C, 0x52,
    0x59, 0xA6, 0x74, 0xD2, 0xE6, 0xF4, 0xB4, 0xC0, 0xD1, 0x66, 0xAF, 0xC2, 0x39, 0x4B, 0x63, 0xB6
];

const S_REVERSE = [
    0xA5, 0x2D, 0x32, 0x8F, 0x0E, 0x30, 0x38, 0xC0, 0x54, 0xE6, 0x9E, 0x39, 0x55, 0x7E, 0x52, 0x91,
    0x64, 0x03, 0x57, 0x5A, 0x1C, 0x60, 0x07, 0x18, 0x21, 0x72, 0xA8, 0xD1, 0x29, 0xC6, 0xA4, 0x3F,
    0xE0, 0x27, 0x8D, 0x0C, 0x82, 0xEA, 0xAE, 0xB4, 0x9A, 0x63, 0x49, 0xE5, 0x42, 0xE4, 0x15, 0xB7,
    0xC8, 0x06, 0x70, 0x9D, 0x41, 0x75, 0x19, 0xC9, 0xAA, 0xFC, 0x4D, 0xBF, 0x2A, 0x73, 0x84, 0xD5,
    0xC3, 0xAF, 0x2B, 0x86, 0xA7, 0xB1, 0xB2, 0x5B, 0x46, 0xD3, 0x9F, 0xFD, 0xD4, 0x0F, 0x9C, 0x2F,
    0x9B, 0x43, 0xEF, 0xD9, 0x79, 0xB6, 0x53, 0x7F, 0xC1, 0xF0, 0x23, 0xE7, 0x25, 0x5E, 0xB5, 0x1E,
    0xA2, 0xDF, 0xA6, 0xFE, 0xAC, 0x22, 0xF9, 0xE2, 0x4A, 0xBC, 0x35, 0xCA, 0xEE, 0x78, 0x05, 0x6B,
    0x51, 0xE1, 0x59, 0xA3, 0xF2, 0x71, 0x56, 0x11, 0x6A, 0x89, 0x94, 0x65, 0x8C, 0xBB, 0x77, 0x3C,
    0x7B, 0x28, 0xAB, 0xD2, 0x31, 0xDE, 0xC4, 0x5F, 0xCC, 0xCF, 0x76, 0x2C, 0xB8, 0xD8, 0x2E, 0x36,
    0xDB, 0x69, 0xB3, 0x14, 0x95, 0xBE, 0x62, 0xA1, 0x3B, 0x16, 0x66, 0xE9, 0x5C, 0x6C, 0x6D, 0xAD,
    0x37, 0x61, 0x4B, 0xB9, 0xE3, 0xBA, 0xF1, 0xA0, 0x85, 0x83, 0xDA, 0x47, 0xC5, 0xB0, 0x33, 0xFA,
    0x96, 0x6F, 0x6E, 0xC2, 0xF6, 0x50, 0xFF, 0x5D, 0xA9, 0x8E, 0x17, 0x1B, 0x97, 0x7D, 0xEC, 0x58,
    0xF7, 0x1F, 0xFB, 0x7C, 0x09, 0x0D, 0x7A, 0x67, 0x45, 0x87, 0xDC, 0xE8, 0x4F, 0x1D, 0x4E, 0x04,
    0xEB, 0xF8, 0xF3, 0x3E, 0x3D, 0xBD, 0x8A, 0x88, 0xDD, 0xCD, 0x0B, 0x13, 0x98, 0x02, 0x93, 0x80,
    0x90, 0xD0, 0x24, 0x34, 0xCB, 0xED, 0xF4, 0xCE, 0x99, 0x10, 0x44, 0x40, 0x92, 0x3A, 0x01, 0x26,
    0x12, 0x1A, 0x48, 0x68, 0xF5, 0x81, 0x8B, 0xC7, 0xD6, 0x20, 0x0A, 0x08, 0x00, 0x4C, 0xD7, 0x74
];

const L_VEC = [
    148, 32, 133, 16, 194, 192, 1, 251, 1, 192, 194, 16, 133, 32, 148, 1
];

const C = [
    [0x6e, 0xa2, 0x76, 0x72, 0x6c, 0x48, 0x7a, 0xb8, 0x5d, 0x27, 0xbd, 0x10, 0xdd, 0x84, 0x94, 0x01],
    [0xdc, 0x87, 0xec, 0xe4, 0xd8, 0x90, 0xf4, 0xb3, 0xba, 0x4e, 0xb9, 0x20, 0x79, 0xcb, 0xeb, 0x02],
    [0xb2, 0x25, 0x9a, 0x96, 0xb4, 0xd8, 0x8e, 0x0b, 0xe7, 0x69, 0x04, 0x30, 0xa4, 0x4f, 0x7f, 0x03],
    [0x7b, 0xcd, 0x1b, 0x0b, 0x73, 0xe3, 0x2b, 0xa5, 0xb7, 0x9c, 0xb1, 0x40, 0xf2, 0x55, 0x15, 0x04],
    [0x15, 0x6f, 0x6d, 0x79, 0x1f, 0xab, 0x51, 0x1d, 0xea, 0xbb, 0x0c, 0x50, 0x2f, 0xd1, 0x81, 0x05],
    [0xa7, 0x4a, 0xf7, 0xef, 0xab, 0x73, 0xdf, 0x16, 0x0d, 0xd2, 0x08, 0x60, 0x8b, 0x9e, 0xfe, 0x06],
    [0xc9, 0xe8, 0x81, 0x9d, 0xc7, 0x3b, 0xa5, 0xae, 0x50, 0xf5, 0xb5, 0x70, 0x56, 0x1a, 0x6a, 0x07],
    [0xf6, 0x59, 0x36, 0x16, 0xe6, 0x05, 0x56, 0x89, 0xad, 0xfb, 0xa1, 0x80, 0x27, 0xaa, 0x2a, 0x08],
    [0x98, 0xfb, 0x40, 0x64, 0x8a, 0x4d, 0x2c, 0x31, 0xf0, 0xdc, 0x1c, 0x90, 0xfa, 0x2e, 0xbe, 0x09],
    [0x2a, 0xde, 0xda, 0xf2, 0x3e, 0x95, 0xa2, 0x3a, 0x17, 0xb5, 0x18, 0xa0, 0x5e, 0x61, 0xc1, 0x0a],
    [0x44, 0x7c, 0xac, 0x80, 0x52, 0xdd, 0xd8, 0x82, 0x4a, 0x92, 0xa5, 0xb0, 0x83, 0xe5, 0x55, 0x0b],
    [0x8d, 0x94, 0x2d, 0x1d, 0x95, 0xe6, 0x7d, 0x2c, 0x1a, 0x67, 0x10, 0xc0, 0xd5, 0xff, 0x3f, 0x0c],
    [0xe3, 0x36, 0x5b, 0x6f, 0xf9, 0xae, 0x07, 0x94, 0x47, 0x40, 0xad, 0xd0, 0x08, 0x7b, 0xab, 0x0d],
    [0x51, 0x13, 0xc1, 0xf9, 0x4d, 0x76, 0x89, 0x9f, 0xa0, 0x29, 0xa9, 0xe0, 0xac, 0x34, 0xd4, 0x0e],
    [0x3f, 0xb1, 0xb7, 0x8b, 0x21, 0x3e, 0xf3, 0x27, 0xfd, 0x0e, 0x14, 0xf0, 0x71, 0xb0, 0x40, 0x0f],
    [0x2f, 0xb2, 0x6c, 0x2c, 0x0f, 0x0a, 0xac, 0xd1, 0x99, 0x35, 0x81, 0xc3, 0x4e, 0x97, 0x54, 0x10],
    [0x41, 0x10, 0x1a, 0x5e, 0x63, 0x42, 0xd6, 0x69, 0xc4, 0x12, 0x3c, 0xd3, 0x93, 0x13, 0xc0, 0x11],
    [0xf3, 0x35, 0x80, 0xc8, 0xd7, 0x9a, 0x58, 0x62, 0x23, 0x7b, 0x38, 0xe3, 0x37, 0x5c, 0xbf, 0x12],
    [0x9d, 0x97, 0xf6, 0xba, 0xbb, 0xd2, 0x22, 0xda, 0x7e, 0x5c, 0x85, 0xf3, 0xea, 0xd8, 0x2b, 0x13],
    [0x54, 0x7f, 0x77, 0x27, 0x7c, 0xe9, 0x87, 0x74, 0x2e, 0xa9, 0x30, 0x83, 0xbc, 0xc2, 0x41, 0x14],
    [0x3a, 0xdd, 0x01, 0x55, 0x10, 0xa1, 0xfd, 0xcc, 0x73, 0x8e, 0x8d, 0x93, 0x61, 0x46, 0xd5, 0x15],
    [0x88, 0xf8, 0x9b, 0xc3, 0xa4, 0x79, 0x73, 0xc7, 0x94, 0xe7, 0x89, 0xa3, 0xc5, 0x09, 0xaa, 0x16],
    [0xe6, 0x5a, 0xed, 0xb1, 0xc8, 0x31, 0x09, 0x7f, 0xc9, 0xc0, 0x34, 0xb3, 0x18, 0x8d, 0x3e, 0x17],
    [0xd9, 0xeb, 0x5a, 0x3a, 0xe9, 0x0f, 0xfa, 0x58, 0x34, 0xce, 0x20, 0x43, 0x69, 0x3d, 0x7e, 0x18],
    [0xb7, 0x49, 0x2c, 0x48, 0x85, 0x47, 0x80, 0xe0, 0x69, 0xe9, 0x9d, 0x53, 0xb4, 0xb9, 0xea, 0x19],
    [0x05, 0x6c, 0xb6, 0xde, 0x31, 0x9f, 0x0e, 0xeb, 0x8e, 0x80, 0x99, 0x63, 0x10, 0xf6, 0x95, 0x1a],
    [0x6b, 0xce, 0xc0, 0xac, 0x5d, 0xd7, 0x74, 0x53, 0xd3, 0xa7, 0x24, 0x73, 0xcd, 0x72, 0x01, 0x1b],
    [0xa2, 0x26, 0x41, 0x31, 0x9a, 0xec, 0xd1, 0xfd, 0x83, 0x52, 0x91, 0x03, 0x9b, 0x68, 0x6b, 0x1c],
    [0xcc, 0x84, 0x37, 0x43, 0xf6, 0xa4, 0xab, 0x45, 0xde, 0x75, 0x2c, 0x13, 0x46, 0xec, 0xff, 0x1d],
    [0x7e, 0xa1, 0xad, 0xd5, 0x42, 0x7c, 0x25, 0x4e, 0x39, 0x1c, 0x28, 0x23, 0xe2, 0xa3, 0x80, 0x1e],
    [0x10, 0x03, 0xdb, 0xa7, 0x2e, 0x34, 0x5f, 0xf6, 0x64, 0x3b, 0x95, 0x33, 0x3f, 0x27, 0x14, 0x1f],
    [0x5e, 0xa7, 0xd8, 0x58, 0x1e, 0x14, 0x9b, 0x61, 0xf1, 0x6a, 0xc1, 0x45, 0x9c, 0xed, 0xa8, 0x20],
];



function KuzX(left, right) {
    return left.map((elem, index) => elem ^ right[index]);
}

function KuzS(part) {
    return part.map(elem => S[elem]);
}

function KuzSReverse(part) {
    return part.map(elem => S_REVERSE[elem]);
}

function KuzGfMul(left, right) {
    let result = 0;
    let hi_bit;
    for (let i = 0; i < 8; i++) {
        if (right & 1) {
            result ^= left;
        }
        hi_bit = left & 0x80;
        left <<= 1;
        if (hi_bit) {
            left ^= 0xc3;
        }
        right >>= 1;
    }
    return result;
}

function KuzR(data) {
    let result = new Uint8Array(data.length);
    let a_15 = 0;
    for (let i = 0; i < data.length; i++) {
        a_15 ^= KuzGfMul(data[i], L_VEC[i]);
    }
    result.set([a_15], 0);
    result.set(data.slice(0, data.length - 1), 1);
    return result;
}

function KuzRReverse(data) {
    let result = new Uint8Array(data.length);
    let copy = new Uint8Array(data.length);
    result.set(data.slice(1), 0);
    copy.set(data.slice(1), 0);
    copy.set([data[0]], copy.length - 1)

    let a_0 = 0;
    for (let i = 0; i < copy.length; i++) {
        a_0 ^= KuzGfMul(copy[i], L_VEC[i]);
    }
    
    result.set([a_0], result.length - 1);
    return result;
}

function KuzL(data) {
    let result = data.slice();
    for (let i = 0; i < 16; i++) {
        result = KuzR(result);
    }
    return result;
}

function KuzLReverse(data) {
    let result = data.slice();
    for (let i = 0; i < 16; i++) {
        result = KuzRReverse(result);
    }
    return result;
}

function KuzF(left, right, iter_c) {
    return [KuzX(KuzL(KuzS(KuzX(left, iter_c))), right), left.slice()];
}

function KuzExpandKey(key) {
    let result = [
        key.slice(0, 16),
        key.slice(16)
    ];
    for (let i = 0; i < 4; i++) {
        let [p1, p2] = [result[i * 2].slice(), result[i * 2 + 1].slice()];
        for (let j = 0; j < 8; j++) {
            [p1, p2] = KuzF(p1, p2, C[i * 8 + j]);
        }
        result.push(p1);
        result.push(p2);
    }
    return result;
}

function KuzEnc(part, keys) {
    let result = part.slice();
    for (let key of keys.slice(0, keys.length - 1)) {
        result = KuzL(KuzS(KuzX(result, key)));
    }
    result = KuzX(result, keys[keys.length - 1]);
    return result;
}

function KuzDec(part, keys) {
    let result = part.slice();
    for (let key of keys.slice(1).reverse()) {
        result = KuzSReverse(KuzLReverse(KuzX(result, key)));
    }
    result = KuzX(result, keys[0]);
    return result;
}

//делим на блоки по 16
function KuzProto(phrase, key, encryption_func) {
    let phrase_bytes = hexToBytes(phrase, 16);
    let key_bytes = hexToBytes(key, 32);
    let keys = KuzExpandKey(key_bytes);
    let result = [];
    for (let i = 0; i < phrase_bytes.length; i += 16) {
        result.push(...encryption_func(phrase_bytes.slice(i, i + 16), keys));
    }
    return bytesToHex(result);
}

function KuzEncrypt(phrase, key) {
    return KuzProto(phrase, key, KuzEnc);
}

function KuzDecrypt(phrase, key) {
    return KuzProto(phrase, key, KuzDec);
}

// подготавливаем шразу, разбиваем ее на блоки по 64 бита
function KuzPrepairPhrase(phrase, key, cryptType) {
    if (cryptType) {
        phrase = pointToText(phrase).toLocaleLowerCase();

        let phraseLen = phrase.length;
        if (phrase.length % 8 != 0) {
            for (let i = 0; i < 8 - (phraseLen % 8); i++) {
                phrase += 'ф';
            }
        }
        phrase = new TextEncoder().encode(phrase);
        phrase = bytesToHex(phrase);

        let newPhrase = ""
        phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 32) {
            let crypt_phrase = phrase.slice(k, k + 32);
            let temp = KuzEncrypt(crypt_phrase, key);
            newPhrase += temp;
        }
        return newPhrase;
    } else {
        let newPhrase = "";
        let phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 32) {
            let crypt_phrase = phrase.slice(k, k + 32);
            let temp = KuzDecrypt(crypt_phrase, key);
            newPhrase += temp;
        }

        newPhrase = hexToBytes(newPhrase);
        newPhrase = new TextDecoder().decode(newPhrase);
        while (newPhrase[newPhrase.length - 1] == "ф") {
            newPhrase = newPhrase.substring(0, newPhrase.length - 1);
        }

        newPhrase = textToPoint(newPhrase);
        return newPhrase;
    }
}

// функции взаимодействия с интерфейсом
function encryptText() {
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;
    let encryptedText = "";
    // Если есть загруженный файл, используем его содержимое
    if (currentFileContent && text === currentFileContent) {
        text = currentFileContent;
    }
    
    if (key.length != 64) {
        document.getElementById('message-text').innerText = 
            'Ключ неверен!!! Введите ключ длинной 64 символа';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    } else {
        encryptedText = KuzPrepairPhrase(text, key, true);
    }

    document.getElementById('result').value = encryptedText;
    document.getElementById('message-text').innerText = 'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;

    let decryptedText = "";
    // Если есть загруженный файл, используем его содержимое
    if (currentFileContent && text === currentFileContent) {
        text = currentFileContent;
    }
    
    if (key.length != 64) {
        document.getElementById('message-text').innerText = 
            'Ключ неверен!!! Введите ключ длинной 64 символа';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    } else {
        decryptedText = KuzPrepairPhrase(text, key, false);
    }

    document.getElementById('result').value = decryptedText;
    document.getElementById('message-text').innerText = 'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('file-input').addEventListener('change', handleFileUpload);
});