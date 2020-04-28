pipeline {
  environment {
    registry = "aviruprc/mypersonalcv"
    registryCredential = 'DockerHub'
    dockerImage = docker.build registry + ":latest"
  }
  agent any
  stages {
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":latest"
        }
      }
    }
  }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
          dockerImage.push()
      }
    }
  }
}
      
}