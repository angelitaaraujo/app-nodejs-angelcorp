pipeline {
  agent any
  
  options {
    // Manter apenas os últimos 10 builds
    buildDiscarder(logRotator(numToKeepStr: '10'))
    // Timeout de 30 minutos
    timeout(time: 30, unit: 'MINUTES')
  }
  
  environment {
    // Variáveis de ambiente
    NODE_ENV = 'test'
    COVERAGE_THRESHOLD = '80'
  }
  
  stages {
    stage('Clone') {
      steps {
        echo '========== ESTÁGIO: Clone =========='
        echo 'Clonando repositório do Git...'
        checkout scm
        echo 'Repositório clonado com sucesso!'
      }
    }
    
    stage('Install') {
      steps {
        echo '========== ESTÁGIO: Install =========='
        echo 'Instalando dependências com npm...'
        sh 'npm install'
        echo 'Dependências instaladas com sucesso!'
      }
    }
    
    stage('Test') {
      steps {
        echo '========== ESTÁGIO: Test =========='
        echo 'Executando testes com Jest...'
        sh 'npm test'
        echo 'Testes executados com sucesso!'
      }
    }
    
    stage('Análise de Cobertura') {
      steps {
        echo '========== ESTÁGIO: Análise de Cobertura =========='
        script {
          def coverageFile = readJSON file: 'coverage/coverage-summary.json'
          def lineCoverage = coverageFile.total.lines.pct
          
          echo "Cobertura de linhas: ${lineCoverage}%"
          
          if (lineCoverage < 80) {
            error("❌ FALHA: Cobertura de ${lineCoverage}% é menor que ${COVERAGE_THRESHOLD}%")
          } else {
            echo "✅ SUCESSO: Cobertura de ${lineCoverage}% atende ao requisito mínimo de ${COVERAGE_THRESHOLD}%"
          }
        }
      }
    }

    stage('Build') {
      steps {
        echo '========== ESTÁGIO: Build =========='
        echo 'Compilando aplicação...'
        sh 'npm run build || echo "Nenhum script de build definido"'
        echo 'Build concluído!'
      }
    }
    
    stage('Archive') {
      steps {
        echo '========== ESTÁGIO: Archive =========='
        echo 'Arquivando artefatos...'
        
        // Arquivar relatório de cobertura
        archiveArtifacts artifacts: 'coverage/**', 
                         allowEmptyArchive: true,
                         fingerprint: true
        
        // Arquivar relatório de testes (se existir)
        archiveArtifacts artifacts: '**/test-results.xml',
                         allowEmptyArchive: true
        
        echo 'Artefatos arquivados com sucesso!'
      }
    }
  }
  
  post {
    always {
      echo '========== PÓS-EXECUÇÃO =========='
      echo 'Limpando workspace...'
      cleanWs()
    }
    
    success {
      echo '✅ Pipeline executado com SUCESSO!'
    }
    
    failure {
      echo '❌ Pipeline FALHOU!'
    }
  }
}
