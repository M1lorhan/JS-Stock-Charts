// const dotenv = require('dotenv')
// dotenv.config();

// let apiUrl = `https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=${API_KEY}`;
    // let result = await chartsData.json();
    // console.log(result)
    
    //let GME = result.GME
    //let MSFT = result.MSFT
    //let DIS = result.DIS
    //let BNTX = result.BNTX

    async function main() {
        const timeChartCanvas = document.querySelector('#time-chart');
        const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
        const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
        const stocks = ["GME", "MSFT", "DIS", "BNTX"];
    
        // Reverse values for all stocks to plot in chronological order if necessary
        stocks.forEach(stock => mockData[stock].values.reverse());
    
        // Function to get highest value for a stock
        function getHighestValue(stock) {
            const values = mockData[stock].values;
            const highestValue = Math.max(...values.map(value => parseFloat(value.high)));
            return highestValue;
        }
    
        // Get highest values for each stock
        const highestValues = stocks.map(stock => getHighestValue(stock));
    
        // Chart.js for Time Series Line Chart
        new Chart(timeChartCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: mockData[stocks[0]].values.map(value => value.datetime),
                datasets: stocks.map(stock => ({
                    label: stock,
                    data: mockData[stock].values.map(value => parseFloat(value.high)),
                    backgroundColor: getColor(stock),
                    borderColor: getColor(stock),
                    fill: false
                }))
            }
        });
    
        // Chart.js for Bar Chart of Highest Prices
        new Chart(highestPriceChartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: stocks,
                datasets: [{
                    label: 'Highest Prices',
                    data: highestValues,
                    backgroundColor: stocks.map(stock => getColor(stock)),
                    borderColor: stocks.map(stock => getColor(stock)),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    
        // Chart.js for Average Price Pie Chart (Example)
        new Chart(averagePriceChartCanvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: stocks,
                datasets: [{
                    label: 'Average Prices',
                    data: stocks.map(stock => {
                        const values = mockData[stock].values.map(value => parseFloat(value.close));
                        const average = values.reduce((acc, val) => acc + val, 0) / values.length;
                        return average.toFixed(2);
                    }),
                    backgroundColor: stocks.map(stock => getColor(stock)),
                    borderColor: stocks.map(stock => getColor(stock)),
                    borderWidth: 1
                }]
            }
        });
    
        function getColor(stock){
            switch (stock) {
                case "GME":
                    return 'rgba(61, 161, 61, 0.7)';
                case "MSFT":
                    return 'rgba(209, 4, 25, 0.7)';
                case "DIS":
                    return 'rgba(18, 4, 209, 0.7)';
                case "BNTX":
                    return 'rgba(166, 43, 158, 0.7)';
                default:
                    return 'rgba(0, 0, 0, 0.7)';
            }
        }
    
        console.log(mockData[stocks[0]].values); // Output values for debugging
    }
    
    main();