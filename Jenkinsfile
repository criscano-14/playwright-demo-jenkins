pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps { bat 'npm install' } 
        }
        stage('Run Playwright Tests') {
            steps { bat 'npm run test' } 
        }
        stage('Publish Allure Report') {
            steps { 
                allure([
                    includeProperties: false,
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
    always {
        // Publish HTML report from allure-report folder
        publishHTML([ 
            reportDir: 'allure-report',
            reportFiles: 'index.html',
            reportName: 'HTML Report',
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true
        ])
    }

    failure {
        echo 'Tests failed! Build marked RED.'
    }

    success {
        echo 'All tests passed! Build marked GREEN.'
    }
}
}
