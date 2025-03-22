# React performance task

## Performance Before Optimization

### Initial render
* Render Duration - 74.1ms
* Interaction: Initial page load

<details>
<summary>Performance Metrics Screenshots</summary>

![Flame Graph](./public/performance/beforeOptimization/initialFlame.png)
*Flame graph showing component render times*

![Ranked Chart](./public/performance/beforeOptimization/initialRanked.png)
*Ranked chart of components by render duration*
</details>

### Sort by region
* Total Render Duration - 50.9ms (40.5ms + 10.4ms)
* First render: State update (40.5ms)
* Second render: List update (10.4ms)
* Interaction: Region filter change

<details>
<summary>Performance Metrics Screenshots</summary>

![Flame Graph](./public/performance/beforeOptimization/sortByRegionFlame.png)
*Flame graph showing component render times during region sort*

![Ranked Chart](./public/performance/beforeOptimization/sortByRegionRanked.png)
*Ranked chart of components by render duration during region sort*
</details>

### Sort by name
* Total Render Duration - 82.3ms (45.3ms + 37ms)
* First render: State update (45.3ms)
* Second render: List update (37ms)
* Interaction: Name sort change

<details>
<summary>Performance Metrics Screenshots</summary>

![Flame Graph](./public/performance/beforeOptimization/sortByNameFlame.png)
*Flame graph showing component render times during name sort*

![Ranked Chart](./public/performance/beforeOptimization/sortByNameRanked.png)
*Ranked chart of components by render duration during name sort*
</details>

### Sort by population
* Total Render Duration - 86ms (43.8ms + 42.2ms)
* First render: State update (43.8ms)
* Second render: List update (42.2ms)
* Interaction: Population sort change

<details>
<summary>Performance Metrics Screenshots</summary>

![Flame Graph](./public/performance/beforeOptimization/sortByPopulationFlame.png)
*Flame graph showing component render times during population sort*

![Ranked Chart](./public/performance/beforeOptimization/sortByPopulationRanked.png)
*Ranked chart of components by render duration during population sort*
</details>

### Search by name (letter "P")
* Total Render Duration - 44.4ms (39.2ms + 5.2ms)
* First render: State update (39.2ms)
* Second render: List update (5.2ms)
* For the rest of the letters render time is around 4ms+4ms
* Interaction: Search input change

<details>
<summary>Performance Metrics Screenshots</summary>

![Flame Graph](./public/performance/beforeOptimization/searchByNameFlame.png)
*Flame graph showing component render times during name search*

![Ranked Chart](./public/performance/beforeOptimization/searchByNameRanked.png)
*Ranked chart of components by render duration during name search*
</details>
