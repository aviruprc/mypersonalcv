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
        label 'java-jenkins-slave'
      }
      steps{
        sh 'gcloud --version'
	git credentialsId: 'GitHub', url: 'https://github.com/aviruprc/secrets'
        sh 'gcloud auth activate-service-account --key-file=avi-returns-aa5d13550a37.json'
        sh 'gcloud beta container --project "avi-returns" clusters create "cluster-1" --zone "us-central1-c"--no-enable-basic-auth --cluster-version "1.14.10-gke.27" --machine-type "custom-1-1024" --image-type "COS" --disk-type "pd-standard" --disk-size "10" --metadata disable-legacy-endpoints=true --service-account "k8s-service-account@avi-returns.iam.gserviceaccount.com" --num-nodes "1" --enable-stackdriver-kubernetes --enable-ip-alias --network "projects/avi-returns/global/networks/default" --subnetwork "projects/avi-returns/regions/us-central1/subnetworks/default" --default-max-pods-per-node "110" --no-enable-master-authorized-networks --addons HorizontalPodAutoscaling,HttpLoadBalancing --enable-autoupgrade --enable-autorepair --max-surge-upgrade 1 --max-unavailable-upgrade 0'
        sh 'helm install ./cv --generate-name'
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
