pipeline {
  agent none
  stages {
    stage('Build') {
  agent {
    docker {
      image 'node:10'
      args '-p 3000:3000 -u 0'
    }
  }
      steps {
        sh 'npm install'
        sh 'npm run test'
        sh 'npm run build:beta'
      }
    }
    stage('CopyToS3') {
      agent any
      steps {
        sh 'aws s3 cp dist/index.bundle.js s3://cohab/index.bundle.js'
        sh 'aws s3 cp dist/reset.bundle.js s3://cohab/reset.bundle.js'
      
      }
  environment {
    AWS_ACCESS_KEY_ID = credentials('AccessKeyID')
    AWS_SECRET_ACCESS_KEY = credentials('SecretAccessKey')
  }
      
    }
  environment {
    HOME = '.'
  }
}
