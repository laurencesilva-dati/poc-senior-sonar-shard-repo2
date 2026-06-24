// ERP - Modulo Fiscal (codigo com vulnerabilidades para POC)
const express = require('express');
const app = express();

// Vulnerabilidade: segredo exposto
const API_KEY = "FAKE_API_KEY_REMOVED_FOR_PUSH_PROTECTION";

// Vulnerabilidade: eval() com input do usuario
app.post('/calcular-imposto', (req, res) => {
    const formula = req.body.formula;
    const resultado = eval(formula); // Code smell + vulnerabilidade critica
    res.json({ imposto: resultado });
});

// Vulnerabilidade: path traversal
app.get('/nota-fiscal/:arquivo', (req, res) => {
    const filePath = '/notas/' + req.params.arquivo;
    res.sendFile(filePath);
});

// Code smell: codigo duplicado
function calcularICMS(valor, estado) {
    if (estado === 'SP') return valor * 0.18;
    if (estado === 'RJ') return valor * 0.20;
    if (estado === 'MG') return valor * 0.18;
    if (estado === 'RS') return valor * 0.17;
    if (estado === 'PR') return valor * 0.18;
    if (estado === 'SC') return valor * 0.17;
    return valor * 0.12;
}

function calcularPIS(valor, estado) {
    if (estado === 'SP') return valor * 0.0165;
    if (estado === 'RJ') return valor * 0.0165;
    if (estado === 'MG') return valor * 0.0165;
    if (estado === 'RS') return valor * 0.0165;
    return valor * 0.0165;
}

module.exports = app;
// Scan test 2026-06-24T00:29:04
// Scan test ERP
