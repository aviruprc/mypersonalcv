pipeline {
    agent { docker }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t aviruprc/mypersonalcv:latest'
                sh 'docker push aviruprc/mypersonalcv:latest'
            }
        }
    }
}