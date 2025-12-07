export type Language = 'en' | 'es' | 'fr';

export const translations = {
  en: {
    appTitle: 'Beautiful Notes',
    sidebar: {
      myNotes: 'My Notes',
      newNote: 'New Note',
      settings: 'Settings',
      help: 'Help',
      searchPlaceholder: 'Find a note...',
      emptyState: 'No notes found',
      subtitle: 'local user'
    },
    editor: {
      placeholder: 'Start writing...',
      untitled: 'Untitled',
      transforming: 'Transforming...',
      error: 'Error',
      emptyStateTitle: 'No note selected',
      emptyStateText: 'Select a note from the sidebar or create a new one',
      tooltips: {
        suggest: 'Suggest filename with AI',
        preview: 'Preview',
        edit: 'Edit',
        transform: 'Transform Draft with AI',
        delete: 'Delete Note'
      }
    },
    settings: {
      title: 'Settings',
      general: 'General',
      appearance: 'Appearance',
      language: 'Language',
      theme: 'Theme',
      geminiApiKey: 'Gemini API Key',
      save: 'Save Settings',
      cancel: 'Cancel',
      languageOptions: {
        en: 'English',
        es: 'Español',
        fr: 'Français'
      },
      themeOptions: {
        dark: 'Dark',
        light: 'Light',
        midnight: 'Midnight'
      },
      apiKeyHelp: 'Get your key from Google AI Studio'
    },
    help: {
      title: 'Help & About',
      about: 'About',
      madeBy: 'Made by',
      description: 'Beautiful Notes is a powerful Chrome extension for taking notes with AI-powered features, multi-language support, and beautiful themes.',
      repository: 'GitHub Repository',
      repoText: 'This project is open source! Check out the code, contribute, or star the repo:',
      issues: 'Report an Issue',
      issuesText: 'Found a bug or have a feature request? Here\'s how to report it:',
      step1: 'Go to the GitHub repository',
      step2: 'Click on "Issues" tab',
      step3: 'Click "New Issue"',
      step4: 'Describe the bug or feature request with details',
      createIssue: 'Create New Issue',
      contact: 'Contact',
      contactText: 'For questions or feedback, feel free to reach out via GitHub issues.',
      close: 'Close'
    }
  },
  es: {
    appTitle: 'Notas Hermosas',
    sidebar: {
      myNotes: 'Mis Notas',
      newNote: 'Nueva Nota',
      settings: 'Ajustes',
      help: 'Ayuda',
      searchPlaceholder: 'Buscar una nota...',
      emptyState: 'No se encontraron notas',
      subtitle: 'usuario local'
    },
    editor: {
      placeholder: 'Empieza a escribir...',
      untitled: 'Sin título',
      transforming: 'Transformando...',
      error: 'Error',
      emptyStateTitle: 'Ninguna nota seleccionada',
      emptyStateText: 'Selecciona una nota de la barra lateral o crea una nueva',
      tooltips: {
        suggest: 'Sugerir nombre con IA',
        preview: 'Vista previa',
        edit: 'Editar',
        transform: 'Transformar borrador con IA',
        delete: 'Eliminar nota'
      }
    },
    settings: {
      title: 'Ajustes',
      general: 'General',
      appearance: 'Apariencia',
      language: 'Idioma',
      theme: 'Tema',
      geminiApiKey: 'Clave API Gemini',
      save: 'Guardar Ajustes',
      cancel: 'Cancelar',
      languageOptions: {
        en: 'English',
        es: 'Español',
        fr: 'Français'
      },
      themeOptions: {
        dark: 'Oscuro',
        light: 'Claro',
        midnight: 'Medianoche'
      },
      apiKeyHelp: 'Obtén tu clave en Google AI Studio'
    },
    help: {
      title: 'Ayuda y Acerca de',
      about: 'Acerca de',
      madeBy: 'Hecho por',
      description: 'Beautiful Notes es una poderosa extensión de Chrome para tomar notas con funciones impulsadas por IA, soporte multiidioma y temas hermosos.',
      repository: 'Repositorio de GitHub',
      repoText: '¡Este proyecto es de código abierto! Consulta el código, contribuye o marca el repositorio:',
      issues: 'Reportar un Problema',
      issuesText: '¿Encontraste un error o tienes una solicitud de función? Así es como reportarlo:',
      step1: 'Ve al repositorio de GitHub',
      step2: 'Haz clic en la pestaña "Issues"',
      step3: 'Haz clic en "New Issue"',
      step4: 'Describe el error o solicitud de función con detalles',
      createIssue: 'Crear Nuevo Problema',
      contact: 'Contacto',
      contactText: 'Para preguntas o comentarios, no dudes en comunicarte a través de GitHub issues.',
      close: 'Cerrar'
    }
  },
  fr: {
    appTitle: 'Belles Notes',
    sidebar: {
      myNotes: 'Mes Notes',
      newNote: 'Nouvelle Note',
      settings: 'Paramètres',
      help: 'Aide',
      searchPlaceholder: 'Chercher une note...',
      emptyState: 'Aucune note trouvée',
      subtitle: 'utilisateur local'
    },
    editor: {
      placeholder: 'Commencez à écrire...',
      untitled: 'Sans titre',
      transforming: 'Transformation...',
      error: 'Erreur',
      emptyStateTitle: 'Aucune note sélectionnée',
      emptyStateText: 'Sélectionnez une note dans la barre latérale ou créez-en une nouvelle',
      tooltips: {
        suggest: 'Suggérer un nom avec IA',
        preview: 'Aperçu',
        edit: 'Éditer',
        transform: 'Transformer le brouillon avec IA',
        delete: 'Supprimer la note'
      }
    },
    settings: {
      title: 'Paramètres',
      general: 'Général',
      appearance: 'Apparence',
      language: 'Langue',
      theme: 'Thème',
      geminiApiKey: 'Clé API Gemini',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      languageOptions: {
        en: 'English',
        es: 'Español',
        fr: 'Français'
      },
      themeOptions: {
        dark: 'Sombre',
        light: 'Clair',
        midnight: 'Minuit'
      },
      apiKeyHelp: 'Obtenez votre clé sur Google AI Studio'
    },
    help: {
      title: 'Aide et À propos',
      about: 'À propos',
      madeBy: 'Créé par',
      description: 'Beautiful Notes est une extension Chrome puissante pour prendre des notes avec des fonctionnalités alimentées par IA, support multilingue et de beaux thèmes.',
      repository: 'Dépôt GitHub',
      repoText: 'Ce projet est open source ! Consultez le code, contribuez ou mettez une étoile au dépôt :',
      issues: 'Signaler un Problème',
      issuesText: 'Vous avez trouvé un bug ou avez une demande de fonctionnalité ? Voici comment le signaler :',
      step1: 'Allez sur le dépôt GitHub',
      step2: 'Cliquez sur l\'onglet "Issues"',
      step3: 'Cliquez sur "New Issue"',
      step4: 'Décrivez le bug ou la demande de fonctionnalité avec des détails',
      createIssue: 'Créer un Nouveau Problème',
      contact: 'Contact',
      contactText: 'Pour des questions ou des commentaires, n\'hésitez pas à nous contacter via GitHub issues.',
      close: 'Fermer'
    }
  }
};
