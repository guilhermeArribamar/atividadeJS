'use strict';
const moeda = valor => valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const porId = id => document.getElementById(id);


porId('formAcademia').addEventListener('submit', function(event) {
  event.preventDefault();
  if (!this.reportValidity()) return;
  const idade = Number(porId('idade').value);
  const plano = Number(porId('plano').value);
  const adicionais = (porId('personal').checked ? 80 : 0) + (porId('avaliacao').checked ? 50 : 0);
  const subtotal = plano + adicionais;
  const desconto = idade >= 60 ? subtotal * 0.10 : 0;
  alert(`Mensalidade da Academia Vida Ativa\nAluno: ${porId('nomeAluno').value.trim() || 'Não informado'}\nPlano e adicionais: ${moeda(subtotal)}\nDesconto: ${moeda(desconto)}\nValor final: ${moeda(subtotal - desconto)}`);
});

porId('formHotel').addEventListener('submit', function(event) {
  event.preventDefault();
  if (!this.reportValidity()) return;
  const entrada = porId('entrada').value;
  const saida = porId('saida').value;
  const inicio = Date.parse(`${entrada}T00:00:00Z`);
  const fim = Date.parse(`${saida}T00:00:00Z`);
  if (!Number.isFinite(inicio) || !Number.isFinite(fim) || fim <= inicio) {
    alert('A data de saída deve ser posterior à data de entrada.');
    porId('saida').focus();
    return;
  }
  const diarias = (fim - inicio) / 86400000;
  const hospedes = Number(porId('hospedes').value);
  const quarto = Number(porId('quarto').value);
  const totalQuarto = diarias * quarto;
  const cafe = porId('cafe').checked ? 30 * hospedes * diarias : 0;
  const estacionamento = porId('estacionamento').checked ? 20 * diarias : 0;
  const total = totalQuarto + cafe + estacionamento;
  alert(`Reserva — Hotel Bela Vista\nHóspede: ${porId('nomeHospede').value.trim()}\nDiárias: ${diarias}\nValor do quarto: ${moeda(totalQuarto)}\nServiços opcionais: ${moeda(cafe + estacionamento)}\nTotal da reserva: ${moeda(total)}`);
});

porId('fonte').addEventListener('input', () => {
  porId('valorFonte').textContent = `${porId('fonte').value} px`;
});
let imagemAnterior = null;
porId('visualizar').addEventListener('click', () => {
  const cor = porId('cor').value;
  const texto = porId('textoCamiseta').value.trim() || 'Minha frase';
  const tamanhoFonte = Number(porId('fonte').value);
  porId('corCamiseta').setAttribute('fill', cor);
  porId('frasePreview').textContent = texto;
  porId('frasePreview').style.fontSize = `${tamanhoFonte}px`;
  porId('legendaPreview').textContent = `Personalização · tamanho ${porId('tamanho').value}`;
  const arquivo = porId('imagemEstampa').files[0];
  const imagem = porId('imagemPreview');
  if (imagemAnterior) { URL.revokeObjectURL(imagemAnterior); imagemAnterior = null; }
  imagem.hidden = true;
  imagem.removeAttribute('src');
  if (arquivo) {
    if (!['image/jpeg', 'image/png'].includes(arquivo.type)) {
      alert('Selecione uma imagem JPG ou PNG.');
      return;
    }
    imagemAnterior = URL.createObjectURL(arquivo);
    imagem.src = imagemAnterior;
    imagem.hidden = false;
  }
});
porId('calcularPreco').addEventListener('click', () => {
  const estampa = Number(document.querySelector('input[name="estampa"]:checked').value);
  alert(`Preço da camiseta\nValor base: ${moeda(45)}\nEstampa: ${moeda(estampa)}\nTotal: ${moeda(45 + estampa)}`);
});

porId('formCamiseta').addEventListener('reset', () => {
  if (imagemAnterior) {
    URL.revokeObjectURL(imagemAnterior);
    imagemAnterior = null;
  }
  const imagem = porId('imagemPreview');
  imagem.hidden = true;
  imagem.removeAttribute('src');
  porId('corCamiseta').setAttribute('fill', '#2879c7');
  porId('frasePreview').textContent = 'Minha frase';
  porId('frasePreview').style.fontSize = '24px';
  porId('legendaPreview').textContent = 'Exemplo de personalização · tamanho M';
  porId('valorFonte').textContent = '24 px';
});
