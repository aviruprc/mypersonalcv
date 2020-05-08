pipeline {
  environment {
    registry = "aviruprc/mypersonalcv"
    registryCredential = 'DockerHub'
    dockerImage = ''
  }
  agent any
  stages {

    stage('Installing Gcloud') {
      steps{
        script {
          sh 'docker run gcr.io/google.com/cloudsdktool/cloud-sdk:266.0.0 gcloud version'
          sh 'docker run -ti --name gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud auth login'
          sh '4/zgE9Praw3TOiP8uCbmKZmI5N02QzIZuqSnHBZWhpox2YrgzyTSUAHsk'  
          }
        }
      }



    stage('SSH into Workspace') {
      steps{
        script {
              sh' git clone http://github.com/aviruprc/mypersonalcv'
              sh 'cd mypersonalcv'
        }
      }
    }

    stage('Clone Repo') {
      steps{
        script {
          sh 'gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project avi-test-275806'
          sh 'git clone http://github.com/aviruprc/mypersonalcv ./mycv'
          sh 'cd mycv/'
          sh 'helm install ./mycv --generate-name'
          }
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
