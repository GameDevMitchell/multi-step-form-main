// Form state management
const formData = {
  personalInfo: {
    name: '',
    email: '',
    phone: ''
  },
  plan: {
    name: '',
    price: 0,
    billing: 'monthly'
  },
  addons: []
};

// DOM elements
const form = document.getElementById('multiStepForm');
const formSteps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step');
const nextButtons = document.querySelectorAll('.btn-next');
const backButton = document.querySelector('.btn-back');
const confirmButton = document.querySelector('.btn-confirm');
const changePlanButton = document.querySelector('.change-plan');

// Plan elements
const planCards = document.querySelectorAll('.plan-card');
const yearlyBillingToggle = document.getElementById('yearlyBilling');
const monthlyLabel = document.querySelector('.monthly-label');
const yearlyLabel = document.querySelector('.yearly-label');

// Add-on elements
const addonCards = document.querySelectorAll('.add-on-card');

// Summary elements
const selectedPlanName = document.getElementById('selected-plan-name');
const selectedPlanPrice = document.getElementById('selected-plan-price');
const selectedAddons = document.getElementById('selected-addons');
const totalPrice = document.getElementById('total-price');
const totalPeriod = document.getElementById('total-period');

// Current step tracking
let currentStep = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  updateStepIndicators();
});

// Event listeners
function initializeEventListeners() {
  // Navigation buttons
  nextButtons.forEach(button => {
    button.addEventListener('click', () => handleNextStep());
  });
  
  if (backButton) {
    backButton.addEventListener('click', () => handlePreviousStep());
  }
  
  if (confirmButton) {
    confirmButton.addEventListener('click', (e) => handleFormSubmit(e));
  }
  
  if (changePlanButton) {
    changePlanButton.addEventListener('click', () => goToStep(2));
  }
  
  // Plan selection
  planCards.forEach(card => {
    card.addEventListener('click', () => selectPlan(card));
  });
  
  // Billing toggle
  yearlyBillingToggle.addEventListener('change', () => toggleBilling());
  
  // Add-on selection
  addonCards.forEach(card => {
    card.addEventListener('click', () => toggleAddon(card));
  });
  
  // Form inputs
  const personalInfoInputs = document.querySelectorAll('#name, #email, #phone');
  personalInfoInputs.forEach(input => {
    input.addEventListener('input', () => updatePersonalInfo(input));
    input.addEventListener('blur', () => validateField(input));
  });
}

// Step navigation
function handleNextStep() {
  if (validateCurrentStep()) {
    if (currentStep === 1) {
      savePersonalInfo();
    } else if (currentStep === 2) {
      savePlan();
    } else if (currentStep === 3) {
      saveAddons();
      updateSummary();
    }
    
    if (currentStep < 4) {
      currentStep++;
      showStep(currentStep);
      updateStepIndicators();
    }
  }
}

function handlePreviousStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateStepIndicators();
  }
}

function goToStep(step) {
  currentStep = step;
  showStep(currentStep);
  updateStepIndicators();
}

function showStep(step) {
  formSteps.forEach((formStep, index) => {
    formStep.classList.toggle('active', index + 1 === step);
  });
  
  // Show/hide back button
  if (backButton) {
    backButton.style.display = step === 1 ? 'none' : 'block';
  }
  
  // Show/hide confirm button
  if (confirmButton) {
    confirmButton.style.display = step === 4 ? 'block' : 'none';
  }
}

function updateStepIndicators() {
  stepIndicators.forEach((indicator, index) => {
    const stepNumber = index + 1;
    indicator.classList.remove('active', 'completed');
    
    if (stepNumber === currentStep) {
      indicator.classList.add('active');
    } else if (stepNumber < currentStep) {
      indicator.classList.add('completed');
    }
  });
}

// Validation
function validateCurrentStep() {
  let isValid = true;
  
  if (currentStep === 1) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    isValid = validateField(nameInput) && validateField(emailInput) && validateField(phoneInput);
  } else if (currentStep === 2) {
    isValid = formData.plan.name !== '';
  } else if (currentStep === 3) {
    // Add-ons are optional, so always valid
    isValid = true;
  }
  
  return isValid;
}

function validateField(input) {
  const errorMessage = input.nextElementSibling;
  let isValid = true;
  
  if (input.value.trim() === '') {
    showError(input, errorMessage, 'This field is required');
    isValid = false;
  } else if (input.type === 'email' && !isValidEmail(input.value)) {
    showError(input, errorMessage, 'Invalid email address');
    isValid = false;
  } else if (input.type === 'tel' && !isValidPhone(input.value)) {
    showError(input, errorMessage, 'Invalid phone number');
    isValid = false;
  } else {
    clearError(input, errorMessage);
  }
  
  return isValid;
}

function showError(input, errorMessage, message) {
  input.classList.add('error');
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
}

function clearError(input, errorMessage) {
  input.classList.remove('error');
  errorMessage.classList.remove('show');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Personal info
function updatePersonalInfo(input) {
  formData.personalInfo[input.name] = input.value;
}

function savePersonalInfo() {
  formData.personalInfo.name = document.getElementById('name').value;
  formData.personalInfo.email = document.getElementById('email').value;
  formData.personalInfo.phone = document.getElementById('phone').value;
}

// Plan selection
function selectPlan(card) {
  planCards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  
  const planName = card.dataset.plan;
  const planPrice = parseInt(card.dataset.price);
  
  formData.plan.name = planName;
  formData.plan.price = planPrice;
}

function toggleBilling() {
  const isYearly = yearlyBillingToggle.checked;
  formData.plan.billing = isYearly ? 'yearly' : 'monthly';
  
  // Update UI
  monthlyLabel.classList.toggle('active', !isYearly);
  yearlyLabel.classList.toggle('active', isYearly);
  
  // Update plan prices
  planCards.forEach(card => {
    const monthlyPrice = card.querySelector('.plan-price');
    const yearlyPrice = card.querySelector('.plan-yearly-price');
    const freeMonths = card.querySelector('.free-months');
    
    monthlyPrice.classList.toggle('hidden', isYearly);
    yearlyPrice.classList.toggle('hidden', !isYearly);
    freeMonths.classList.toggle('hidden', !isYearly);
  });
  
  // Update add-on prices
  addonCards.forEach(card => {
    const monthlyPrice = card.querySelector('.addon-price');
    const yearlyPrice = card.querySelector('.addon-yearly-price');
    
    monthlyPrice.classList.toggle('hidden', isYearly);
    yearlyPrice.classList.toggle('hidden', !isYearly);
  });
}

function savePlan() {
  const selectedPlan = document.querySelector('.plan-card.selected');
  if (selectedPlan) {
    formData.plan.name = selectedPlan.dataset.plan;
    formData.plan.price = parseInt(selectedPlan.dataset.price);
  }
}

// Add-ons
function toggleAddon(card) {
  const checkbox = card.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;
  card.classList.toggle('selected', checkbox.checked);
  
  const addonName = card.dataset.addon;
  const addonPrice = parseInt(card.dataset.price);
  
  if (checkbox.checked) {
    if (!formData.addons.find(a => a.name === addonName)) {
      formData.addons.push({ name: addonName, price: addonPrice });
    }
  } else {
    formData.addons = formData.addons.filter(a => a.name !== addonName);
  }
}

function saveAddons() {
  formData.addons = [];
  addonCards.forEach(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      formData.addons.push({
        name: card.dataset.addon,
        price: parseInt(card.dataset.price)
      });
    }
  });
}

// Summary
function updateSummary() {
  const isYearly = formData.plan.billing === 'yearly';
  const period = isYearly ? 'yr' : 'mo';
  
  // Update plan info
  const planDisplayName = formData.plan.name.charAt(0).toUpperCase() + formData.plan.name.slice(1);
  selectedPlanName.textContent = `${planDisplayName} (${isYearly ? 'Yearly' : 'Monthly'})`;
  
  const planPrice = isYearly ? formData.plan.price * 10 : formData.plan.price;
  selectedPlanPrice.textContent = `$${planPrice}/${period}`;
  
  // Update add-ons
  selectedAddons.innerHTML = '';
  let addonTotal = 0;
  
  formData.addons.forEach(addon => {
    const addonDiv = document.createElement('div');
    addonDiv.className = 'addon-summary';
    
    const addonDisplayName = addon.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const addonPrice = isYearly ? addon.price * 10 : addon.price;
    
    addonDiv.innerHTML = `
      <span>${addonDisplayName}</span>
      <span>+$${addonPrice}/${period}</span>
    `;
    
    selectedAddons.appendChild(addonDiv);
    addonTotal += addonPrice;
  });
  
  // Update total
  const total = planPrice + addonTotal;
  totalPrice.textContent = `+$${total}/${period}`;
  totalPeriod.textContent = `Total (per ${isYearly ? 'year' : 'month'})`;
}

// Form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Show thank you step
  currentStep = 5;
  showStep(currentStep);
  updateStepIndicators();
  
  // Hide navigation buttons on thank you step
  if (backButton) backButton.style.display = 'none';
  if (confirmButton) confirmButton.style.display = 'none';
  
  // Log form data (in a real app, this would be sent to a server)
  console.log('Form submitted:', formData);
}

// Utility functions
function formatPrice(price, billing) {
  const period = billing === 'yearly' ? 'yr' : 'mo';
  const multiplier = billing === 'yearly' ? 10 : 1;
  return `$${price * multiplier}/${period}`;
}

function getAddonDisplayName(addonName) {
  const names = {
    'online-service': 'Online service',
    'larger-storage': 'Larger storage',
    'customizable-profile': 'Customizable Profile'
  };
  return names[addonName] || addonName;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('plan-card')) {
    selectPlan(e.target);
  } else if (e.key === 'Enter' && e.target.classList.contains('add-on-card')) {
    toggleAddon(e.target);
  }
});

// Mobile sidebar for smaller screens
function createMobileSidebar() {
  if (window.innerWidth < 940) {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.querySelector('.mobile-step-indicators')) {
      sidebar.innerHTML = `
        <div class="mobile-step-indicators">
          <div class="step ${currentStep === 1 ? 'active' : ''}" data-step="1">
            <div class="step-number">1</div>
          </div>
          <div class="step ${currentStep === 2 ? 'active' : ''}" data-step="2">
            <div class="step-number">2</div>
          </div>
          <div class="step ${currentStep === 3 ? 'active' : ''}" data-step="3">
            <div class="step-number">3</div>
          </div>
          <div class="step ${currentStep === 4 ? 'active' : ''}" data-step="4">
            <div class="step-number">4</div>
          </div>
        </div>
      `;
    }
  }
}

// Initialize mobile sidebar on load and resize
window.addEventListener('load', createMobileSidebar);
window.addEventListener('resize', createMobileSidebar);
