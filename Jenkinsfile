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
                echo 'Publishing Allure report via plugin...'
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
    always {
        // Publish HTML report from allure-report folder
        echo 'Tests finished. Check Allure report.'
    }


    failure {
        echo 'Tests failed! Build marked RED.'
    }

    success {
        echo 'All tests passed! Build marked GREEN.'
    }
    }
}
