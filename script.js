
// Mengambil elemen layar kalkulator
let display = document.getElementById("display");

// Fungsi memasukkan angka
function appendNumber(number) {
    if (display.value === "0" || display.value === "Error") {
        display.value = number === "." ? "0." : number;
    } else {
        display.value += number;
    }
}

// Fungsi memasukkan operator
function appendOperator(operator) {
    if (display.value === "Error") return;

    let lastChar = display.value.slice(-1);

    if ("+-*/".includes(lastChar)) {
        display.value = display.value.slice(0, -1);
    }

    display.value += operator;
}

// Fungsi menghapus semua angka
function clearDisplay() {
    display.value = "0";
}

// Fungsi menghapus satu angka
function deleteNumber() {
    display.value = display.value.slice(0, -1) || "0";
}

// Fungsi menghitung hasil
function calculate() {
    try {
        let expression = display.value;

        if (!/^[0-9+\-*/. ]+$/.test(expression)) {
            throw new Error("Input tidak valid");
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Perhitungan tidak valid");
        }

        display.value = String(
            Number(result.toFixed(10))
        );

    } catch (error) {
        display.value = "Error";
    }
}
