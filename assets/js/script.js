document.getElementById('convertir').addEventListener('click', async () => {
    const cantidad = document.getElementById('cantidad').value;
    const moneda = document.getElementById('moneda').value;
    const resultado = document.querySelector('.resultado');
    const error = document.querySelector('.error');

    // Limpiamos cualquier resultado o error previo
    resultado.textContent = 'Resultado: ';
    error.textContent = '';

    if (!cantidad || isNaN(cantidad)) {
        error.textContent = 'Por favor, ingrese una cantidad válida.';
        return;
    }

    try {
        
        const response = await fetch('https://mindicador.cl/api');
        if (!response.ok) {
            throw new Error('Error en la conexión a la API');
        }
        const data = await response.json();

        // Obtener el valor de la moneda seleccionada
        let valorMoneda = 0;
        if (moneda === 'usd') {
            valorMoneda = data.dolar.valor;
        } else if (moneda === 'eur') {
            valorMoneda = data.euro.valor;
        }

        // Calcular el resultado
        const resultadoFinal = (cantidad / valorMoneda).toFixed(2);

        // Mostrar el resultado en el DOM
        resultado.textContent = `Resultado: ${resultadoFinal} ${moneda.toUpperCase()}`;
        const ctx = document.getElementById('myChart').getContext('2d');

        

        //se construye grafico
    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], 
        datasets: [{
            label: 'Valor del Dólar',
            data: [data.dolar.valor, 800, 750, 780], 
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});
    } catch (err) {
        // Mostrar el error en el DOM
        error.textContent = `Hubo un error: ${err.message}`;
    }
    
});

