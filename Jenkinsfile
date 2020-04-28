pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t aviruprc/mypersonalcv:latest'
                sh 'docker push aviruprc/mypersonalcv:latest'
            }
        }
    }
}