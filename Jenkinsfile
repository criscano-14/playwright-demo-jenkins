pipeline {
    agent any

    stages {
        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests in Docker container...'
                bat 'docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from playwright-test'
            }
        }

        stage('Copy Allure Reports') {
            steps {
                echo 'Copying Allure reports from container to Jenkins workspace...'
                // Copy from Docker volumes to workspace
                bat 'docker run --rm -v allure-results:/data/results -v %CD%\\allure-results:/host/results alpine sh -c "cp -r /data/results/* /host/results/"'
                bat 'docker run --rm -v allure-report:/data/report -v %CD%\\allure-report:/host/report alpine sh -c "cp -r /data/report/* /host/report/"'
            }
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
            echo 'Cleaning up Docker containers...'
            bat 'docker-compose -f docker-compose.yml down --volumes --remove-orphans'
        }

        failure {
            echo 'Tests failed! Build marked RED.'
        }

        success {
            echo 'All tests passed! Build marked GREEN.'
        }
    }
}
