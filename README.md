# Etl Mini

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Description
This project focuses on developing an ETL (Extract, Transform, Load) tool that allows users to perform small-scale ETL tasks directly within their web browser. Designed for ease of use and efficiency, the platform empowers users to handle essential data processing tasks without needing extensive technical knowledge or dedicated infrastructure. By integrating SQLite for data management, the tool ensures quick and reliable data handling. Additionally, it offers robust data visualization and aggregation features, along with advanced text-delimited file analysis capabilities. This project aims to bridge the gap for users seeking quick ETL results by providing an accessible and efficient solution for immediate data processing needs.

## Features
- ETL with SQLite
  - Data Extraction: Efficiently extract data from multiple text-delimited files.
  - Data Transformation: Perform complex data transformations using SQLite, ensuring data is clean, normalized, and ready for analysis.
  - Data Loading: Load transformed data into SQLite databases, facilitating easy access and quick querying.
- Data Visualization Aggregation
  - Interactive Dashboards: Create interactive and dynamic dashboards that update in real-time based on the underlying data.
  - Data Aggregation: Aggregate data across different dimensions and measures to provide comprehensive insights and trends.
Text Delimited File Analysis
  - File Parsing: Efficiently parse and analyze text-delimited files (e.g., CSV, TSV) to extract meaningful information.
  - Data Validation: Ensure data integrity and consistency through rigorous validation checks during the file analysis process.

## Demo
[Try here](https://vercel.com/jordansramirezs-projects/etl-mini)

## Tech Stack
- **Frontend:** Next.js, React, Redux, ReactFlow
- **Deployment:** Vercel

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/jramirez-codes/etl-mini.git
    cd etl-mini
    ```

2. Install the dependencies for both frontend and backend:
    ```bash
    nvm use 20.9.0
    npm install
    ```

## Usage
To start the development server:

1. Start the local server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.


## License
This project is licensed under the Non-Commercial License. See the [LICENSE](./LICENSE) file for details.

---

Thank you for using ETL Mini! We hope you find it useful and easy to use. If you have any suggestions or feedback, please let us know.
