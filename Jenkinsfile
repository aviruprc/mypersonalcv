pipeline {
  environment {
    registry = "aviruprc/mypersonalcv"
    registryCredential = 'DockerHub'
    dockerImage = ''
    PROJECT_ID = 'avi-new'
    CLUSTER_NAME = 'cluster-1'
    LOCATION = 'us-central1-c'
    CREDENTIALS_ID = 'avi-test'
  }
	agent any
  stages {
        stage('Test') {
		steps{
      echo "Test"
      sh 'docker ps'
      sh 'if [ -d "mypersonalcv" ]; then rm -Rf mypersonalcv; fi'
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
      }
    }

    stage('Clean Workspace') {
      steps{
        script {
          sh 'docker rmi aviruprc/mypersonalcv:latest'
          }
        }
      }
  	stage('Kubernetes Deployment') {
      agent {
        label 'gcloud'
      }
      steps{
        sh 'gcloud --version'
        sh 'gcloud auth activate-service-account --key-file=avi-returns-37eff36e98ca.json'
        sh 'gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project avi-returns'
        sh 'kubectl delete -f deploy-info.yaml'
        sh 'kubectl apply -f deploy-info.yaml'
        sh 'kubectl apply -f service-info.yaml'
        }
		  }
  }
  post
	{
		success{
			echo "Build was successful"
		}
		always{
			echo "One way or other, I have finished"
		}
	}
}
