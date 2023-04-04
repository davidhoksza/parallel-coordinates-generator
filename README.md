# Parallel coordinates visualization generator

D3.js-based visualization of CSV datasets with parallel coordinates. The data to be visualized are expected to be stored in a 
CSV file on the disk and therefore one needs an HTTP server to run the code. For instance, one can run:

```
npx http-server --port 8080
```

The visualizations are then accessible at http://localhost:8080/index.html or http://localhost:8080/single-vis.html.

The `index.html` is meant to explore the nutrients dataset which was downloaded from [here](https://github.com/syntagmatic/parallel-coordinates/blob/master/examples/data/nutrients.csv).

The `single-vis` is meant to take any CSV and visualize it given the parameters in `params.json`.

For the purpose of batch visualization, tehre is a Python script which runs [Selenium](https://www.selenium.dev/) to create an SVG export of the visualization.

```
python .\selenium.py
```

The dependencies are [selenium](https://pypi.org/project/selenium/) and [webdriver_manager](https://pypi.org/project/webdriver-manager/).