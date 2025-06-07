async function cargarDatosYGraficar() {
    const response = await fetch("/api/actividades_por_dia");
    const data = await response.json();

    const fechas = data.map(item => item.fecha);
    const cantidades = data.map(item => item.cantidad);

    Highcharts.chart('contenedorGrafico', {
    chart: { type: 'line' },
    title: { text: 'Cantidad de actividades por día' },
    xAxis: {
        categories: fechas,
        title: { text: 'Fecha' }
    },
    yAxis: {
        title: { text: 'Cantidad de actividades' },
        allowDecimals: false
    },
    series: [{
        name: 'Actividades',
        data: cantidades
    }],
    credits: { enabled: false }
    });
}

async function cargarTorta() {
    const response = await fetch("/api/actividades_por_tema");
    const data = await response.json();

    Highcharts.chart('graficoTorta', {
    chart: { type: 'pie' },
    title: { text: 'Actividades por Tipo (Tema)' },
    tooltip: {
        pointFormat: '<b>{point.y} actividades</b> ({point.percentage:.1f}%)'
    },
    accessibility: {
        point: {
        valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}'
        }
        }
    },
    series: [{
        name: 'Temas',
        colorByPoint: true,
        data: data
    }],
    credits: { enabled: false }
    });
}

async function cargarGrafico() {
    const response = await fetch("/api/actividades_por_franja");
    const data = await response.json();

    const mesesNombres = [
    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const categorias = data.meses.map(m => mesesNombres[m]);

    Highcharts.chart('graficoFranja', {
    chart: { type: 'column' },
    title: { text: 'Actividades por Mes y Franja Horaria' },
    xAxis: {
        categories: categorias,
        crosshair: true,
        title: { text: 'Mes' }
    },
    yAxis: {
        min: 0,
        title: { text: 'Cantidad de Actividades' }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' actividades'
    },
    plotOptions: {
        column: { pointPadding: 0.2, borderWidth: 0 }
    },
    series: [
        { name: 'Mañana', data: data["mañana"] },
        { name: 'Mediodía', data: data["mediodía"] },
        { name: 'Tarde', data: data["tarde"] }
    ],
    credits: { enabled: false }
    });
}

cargarDatosYGraficar();
cargarTorta();
cargarGrafico();