// 替换为您的GitHub仓库中CSV文件的URL
const dataUrl = 'https://raw.githubusercontent.com/XinleiCai/database/master/实验存储清单.csv';

// 解析CSV数据的函数
function parseCSV(data) {
    const lines = data.split('\n');
    return lines.map(line => line.split(','));
}

function createTable(data) {
    let table = '<table>';
    data.forEach((row, index) => {
        table += '<tr>';
        row.forEach(cell => {
            if (index === 0) {
                table += '<th>' + cell + '</th>'; // 添加表头
            } else {
                table += '<td>' + cell + '</td>'; // 添加表格数据
            }
        });
        table += '</tr>';
    });
    table += '</table>';
    return table;
}

// 更新 loadData 函数
function loadData() {
    // ... 前面的代码不变 ...
    fetch(dataUrl)
        .then(response => response.text())  // 获取纯文本数据
        .then(csv => {
            const data = parseCSV(csv);
            const container = document.getElementById('data-container');
            container.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => console.error('Error loading data:', error));
    // 更新数据显示部分
    .then(csv => {
        const data = parseCSV(csv);
        const container = document.getElementById('data-container');
        container.innerHTML = createTable(data);
    })
}

// 页面加载时调用 loadData 函数
window.onload = loadData;
