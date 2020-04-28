pipeline {
    agent { dockerfile docker }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
            }
        stage('Build') {
            steps {
                sh 'docker build -t aviruprc/mypersonalcv:latest'
                sh 'docker push aviruprc/mypersonalcv:latest'
            }
        }
    }
}