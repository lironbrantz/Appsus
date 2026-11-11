const { useEffect } = React

export function BookChart({ data }) {

    useEffect(() => {
        if (!data.length) return

        const chart = new window.Chart(
            document.getElementById('books-chart'),
            {
                type: 'bar',
                data: {
                    labels: data.map(item => item.title),
                    datasets: [{
                        label: 'Books (%)',
                        data: data.map(item => item.value),
                        backgroundColor: '#6B4BCF',
                        borderRadius: 6,
                        maxBarThickness: 48
                    }]
                },
                options: {
                    layout: { padding: 8 },
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { grid: { color: '#F1F3F4' } }
                    }
                }
            }
        )

        return () => chart.destroy()
    }, [data])

    return <canvas id="books-chart"></canvas>
}