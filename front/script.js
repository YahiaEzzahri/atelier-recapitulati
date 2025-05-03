let currentPage = 1;
const totalPages = 5;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la barre de progression
    updateProgressBar();
    
    // Ajouter les validations pour les dates
    const dateDebut = document.getElementById('date-debut');
    const dateFin = document.getElementById('date-fin');
    
    dateDebut.addEventListener('change', validateDates);
    dateFin.addEventListener('change', validateDates);
    
    // Ajouter les validations pour les notes
    const noteInputs = [
        document.getElementById('note-individu'),
        document.getElementById('note-entreprise'),
        document.getElementById('note-scientifique')
    ];
    
    noteInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateNote(this);
        });
    });
});

// Validation des dates
function validateDates() {
    const dateDebut = document.getElementById('date-debut');
    const dateFin = document.getElementById('date-fin');
    const errorElement = document.getElementById('date-error');
    
    if (dateDebut.value && dateFin.value) {
        const debut = new Date(dateDebut.value);
        const fin = new Date(dateFin.value);
        
        if (fin <= debut) {
            errorElement.textContent = "La date de fin doit être postérieure à la date de début";
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    }
    return true; // Si l'une des dates n'est pas remplie, on ne bloque pas
}

// Validation des notes (max 20)
function validateNote(input) {
    const errorElement = document.getElementById(input.id + '-error');
    
    if (input.value === '') {
        errorElement.textContent = '';
        return true;
    }
    
    const value = parseFloat(input.value);
    
    if (isNaN(value)) {
        errorElement.textContent = "Veuillez entrer un nombre valide";
        return false;
    }
    
    if (value < 0 || value > 20) {
        errorElement.textContent = "La note doit être comprise entre 0 et 20";
        return false;
    }
    
    errorElement.textContent = "";
    return true;
}

// Update progress bar
function updateProgressBar() {
    const progressPercentage = ((currentPage - 1) / (totalPages - 1)) * 100;
    document.getElementById('progress-bar').style.width = progressPercentage + '%';
}

// Go to next page
function nextPage() {
    // Validation avant de passer à la page suivante
    if (currentPage === 1) {
        // Validation des dates sur la page 1
        if (!validateDates()) {
            return; // Ne pas passer à la page suivante si la validation échoue
        }
    } else if (currentPage === 3) {
        // Validation de la note sur la page 3
        if (!validateNote(document.getElementById('note-individu'))) {
            return;
        }
    } else if (currentPage === 4) {
        // Validation des notes sur la page 4
        if (!validateNote(document.getElementById('note-entreprise'))) {
            return;
        }
    }
    
    if (currentPage < totalPages) {
        document.getElementById('page' + currentPage).classList.remove('active');
        currentPage++;
        document.getElementById('page' + currentPage).classList.add('active');
        updateProgressBar();
        window.scrollTo(0, 0);
    }
}

// Go to previous page
function prevPage() {
    if (currentPage > 1) {
        document.getElementById('page' + currentPage).classList.remove('active');
        currentPage--;
        document.getElementById('page' + currentPage).classList.add('active');
        updateProgressBar();
        window.scrollTo(0, 0);
    }
}

// Submit form
function submitForm() {
    // Validation de la dernière note avant soumission
    if (!validateNote(document.getElementById('note-scientifique'))) {
        return;
    }
    
    // Ici, vous pourriez ajouter du code pour envoyer les données à un serveur
    alert('Formulaire soumis avec succès !');
    // Ou rediriger vers une page de confirmation
    // window.location.href = 'confirmation.html';
}