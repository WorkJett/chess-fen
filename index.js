"use strict";
const types = 'KQRBNPkqrbnp';
const letters = 'abcdefgh';
const isFigure = (val) => types.indexOf(val) >= 0;
const fromFEN = (value) => {
    if (!value || value.length < 16)
        return { figs: [] };
    const figs = [];
    //const valueParts = value.split(' ')
    //const positions = valueParts[0]
    const rows = value.split('/');
    for (let rowIndex in rows) {
        const rowNumber = 8 - parseInt(rowIndex);
        let cellIndex = 0;
        const row = rows[rowIndex];
        let rowItems = row.split('');
        for (let rowItemIndex in rowItems) {
            const rowItem = rowItems[rowItemIndex];
            if (isFigure(rowItem))
                figs.push({ type: rowItem, cell: { n: rowNumber, l: letters[cellIndex] } });
            else
                cellIndex += parseInt(rowItem);
        }
    }
    return { figs };
};
const toFEN = (board) => {
    let result = '';
    let rowIndex = 8;
    while (rowIndex > 0) {
        let posIndex = 0;
        let posAcc = 0;
        while (posIndex < 8) {
            const item = board.figs.find(fig => fig.cell.n === rowIndex && fig.cell.l === letters[posIndex]);
            if (item) {
                if (posAcc > 0)
                    result += `${posAcc}${item.type}`;
                else
                    result += item.type;
                posAcc = 0;
            }
            else {
                posAcc++;
            }
            if (posIndex === 7 && posAcc > 0)
                result += posAcc;
            posIndex++;
        }
        if (rowIndex !== 1)
            result += '/';
        rowIndex--;
    }
    return result;
};
const isUC = (s) => s === s.toUpperCase();
const invertN = (n) => (9 - n);
const invertL = (l) => letters[7 - letters.indexOf(l)];
const invertT = (t) => isUC(t) ? t.toLowerCase() : t.toUpperCase();
const variantOne = (board) => {
    return {
        figs: board.figs.map(fig => {
            return {
                type: invertT(fig.type),
                cell: {
                    n: invertN(fig.cell.n),
                    l: fig.cell.l
                }
            };
        })
    };
};
const variantTwo = (board) => {
    return {
        figs: board.figs.map(fig => {
            return {
                type: fig.type,
                cell: {
                    n: fig.cell.n,
                    l: invertL(fig.cell.l)
                }
            };
        })
    };
};
const variantThree = (board) => {
    return {
        figs: board.figs.map(fig => {
            return {
                type: invertT(fig.type),
                cell: {
                    n: invertN(fig.cell.n),
                    l: invertL(fig.cell.l)
                }
            };
        })
    };
};
const invertC = (color) => color === 'w' ? 'b' : 'w';
const one = (val) => {
    const parts = val.split(' ');
    return `${toFEN(variantOne(fromFEN(parts[0])))} ${invertC(parts[1])} ${parts.slice(2).join(' ')}`;
};
const two = (val) => {
    const parts = val.split(' ');
    return `${toFEN(variantTwo(fromFEN(parts[0])))} ${parts.slice(1).join(' ')}`;
};
const three = (val) => {
    const parts = val.split(' ');
    return `${toFEN(variantThree(fromFEN(parts[0])))} ${invertC(parts[1])} ${parts.slice(2).join(' ')}`;
};
const onClick = () => {
    const source = document.getElementById('source');
    const oneValue = one(source.value);
    const twoValue = two(source.value);
    const threeValue = three(source.value);
    const oneEl = document.getElementById('one');
    oneEl.value = oneValue;
    const twoEl = document.getElementById('two');
    twoEl.value = twoValue;
    const threeEl = document.getElementById('three');
    threeEl.value = threeValue;
};
const resButton = document.getElementById('result');
resButton.addEventListener('click', onClick);
new window.ClipboardJS('#copyOne');
new window.ClipboardJS('#copyTwo');
new window.ClipboardJS('#copyThree');
//const copyoneel = (document.getelementbyid('copyone') as htmlbuttonelement)
//copyoneel.addeventlistener('click', () => {
//const oneel = (document.getelementbyid('one') as htmlinputelement)
//oneel.select();
//oneel.setselectionrange(0, 99999); [>for mobile devices<]
//document.execcommand('copy');
//});
//const copytwoel = (document.getelementbyid('copytwo') as htmlbuttonelement)
//const copyThreeEl = (document.getElementById('copyThree') as HTMLButtonElement)
