#!/usr/bin/env groovy

pipeline {
  agent any
    stages {
      stage('Publish') {
        steps {
          configFileProvider([configFile(fileId: '.npmrc-sijil', variable: 'NPMRC')]) {
            sh 'cp $NPMRC .npmrc'
            sh 'docker run -v $(pwd):/app -w /app node npm publish'
          }
        }
      }
    }
}

