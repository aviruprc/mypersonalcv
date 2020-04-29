pipeline {
  environment {
    registry = "aviruprc/mypersonalcv"
    registryCredential = 'DockerHub'
    dockerImage = ''
  }
  agent any
  stages {
    
    stage('Test') {
		steps{	
      echo "Test"
      sh 'docker'
      }
	  }
    
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":latest"
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
      sh 'docker pune --all'
      }
    }
  }
  
  post
	{
		success{
			echo "Buils was successful"
		}
		always{
			echo "One way or Other I have finished"
		}
	}
}
