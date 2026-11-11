// ===== CÓDIGO PARA GOOGLE APPS SCRIPT =====
// Recibe el mensaje del formulario y lo guarda en la Hoja de cálculo.

function doPost(e) {
  try {
    // 1. Abre la hoja de cálculo a la que está unido este script
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 2. Si la hoja está vacía, escribe los títulos de las columnas
    if (hoja.getLastRow() === 0) {
      hoja.appendRow(['Fecha', 'Nombre', 'Correo', 'Mensaje']);
    }

    // 3. Datos enviados por el formulario
    var p = e.parameter;

    // 4. Si el campo trampa tiene algo, es un robot: no guardamos
    if (p.web) {
      return ContentService.createTextOutput('ignorado');
    }

    // 5. Guarda una fila nueva con fecha, nombre, correo y mensaje
    hoja.appendRow([new Date(), p.nombre || '', p.correo || '', p.mensaje || '']);

    return ContentService.createTextOutput('ok');
  } catch (error) {
    return ContentService.createTextOutput('error: ' + error);
  }
}

// Permite probar la URL en el navegador (muestra un texto simple)
function doGet() {
  return ContentService.createTextOutput('El servicio funciona.');
}
