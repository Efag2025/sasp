let contadorObservacoes = 1;

function adicionarObservacao() {
  const input = document.getElementById("observacaoInput");
  const lista = document.getElementById("listaObservacoes");

  if (input.value.trim() === "") {
    alert("Digite uma observação antes de adicionar.");
    return;
  }

  const item = document.createElement("li");
  item.textContent = `${contadorObservacoes}ª - Observação: ${input.value}`;
  lista.appendChild(item);

  contadorObservacoes++;
  input.value = ""; // limpa textarea
}
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Pegando o número da O.S atual
  const numeroOS = document.getElementById("numeroOrdemServico").innerText;

  // Cabeçalho
  doc.setFontSize(16);
  doc.text("Ordem de Serviço", 20, 20);
  doc.setFontSize(12);
  doc.text(numeroOS, 160, 20);

  let y = 30;

  // Pegando todos os inputs, selects e textareas
  const inputs = document.querySelectorAll("#formOrdem input, #formOrdem select, #formOrdem textarea");
  inputs.forEach((input) => {
    if (input.type !== "button" && input.type !== "submit" && input.type !== "radio") {
      const label = input.closest(".form-group") ? input.closest(".form-group").querySelector("label")?.innerText : '';
      if (label) {
        doc.setFontSize(12);
        doc.text(`${label} ${input.value}`, 20, y);
        y += 8;
      }
    }
  });

  // Observações
  const observacoes = document.querySelectorAll("#listaObservacoes li");
  if (observacoes.length > 0) {
    doc.setFontSize(14);
    doc.text("Observações:", 20, y);
    y += 8;
    observacoes.forEach((obs) => {
      doc.setFontSize(12);
      doc.text(`- ${obs.innerText}`, 24, y);
      y += 7;
    });
  }

  // Salvar PDF
  doc.save(`OrdemDeServico_${numeroOS.replace(/\s+/g, '')}.pdf`);
}

let numeroOrdem = 1;

function gerarNumeroOrdemServico() {
  const numeroFormatado = numeroOrdem.toString().padStart(2, '0');
  const ano = new Date().getFullYear().toString().substr(-2);
  const osNumero = `O.S ${numeroFormatado}/${ano}`;
  document.getElementById("numeroOrdemServico").innerText = osNumero;
  numeroOrdem++;
}
