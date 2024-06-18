let table = document.querySelector("#tbody");
let sortByPer = document.querySelector("#sortByPercentage");
let sortByMkt = document.querySelector("#sortByMktCap");
sortByPer.addEventListener("click", sortByPercentage);
sortByMkt.addEventListener("click", sortByMktCap);


async function renderTable() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false").then(res => {
        return res.json()
    }).then(data => {
        data.forEach(element => {
            table.innerHTML += `
        <tr>
       <td><div class="logoField"> <img class="logo" src="${element.image}">${element.name}</div></td>
        <td>${element.symbol.toUpperCase()}<td>
        <td>${"$ " + element.current_price}<td>
        <td>${element.total_volume}<td>
        <td class="percentage">${element.price_change_percentage_24h}%<td>
        <td>Mkr Cap: ${element.market_cap}<td>
        </tr>`
        });

    })
}
document.addEventListener("DOMContentLoaded",renderTable)
function sortByPercentage() {
    let i, x, y, switching, shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        for (i = 0; i < table.rows.length - 1; i++) {
            x = parseFloat(table.rows[i].getElementsByTagName("td")[7].innerHTML.slice(0, -1));
            y = parseFloat(table.rows[i + 1].getElementsByTagName("td")[7].innerHTML.slice(0, -1));
            console.log("x=", x, "y=", y);
            if (x < y) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i]);
            switching = true;
        }
    }
}
function sortByMktCap() {
    let i, x, y, switching, shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        for (i = 0; i < table.rows.length - 1; i++) {
            x = parseInt(table.rows[i].getElementsByTagName("td")[9].innerHTML.slice(8));
            y = parseInt(table.rows[i + 1].getElementsByTagName("td")[9].innerHTML.slice(8));

            if (x < y) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i]);
            switching = true;
        }
    }
}