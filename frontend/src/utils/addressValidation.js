const normalize = (value) => String(value || '')
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]/g, '');

const canonicalState = (value) => {
  const state = normalize(value);
  if (state.startsWith('andamanandnicobar')) return 'andamanandnicobar';
  if (['dadraandnagarhaveli', 'damananddiu', 'dadraandnagarhavelianddamanddiu'].includes(state)) {
    return 'dadraandnagarhavelianddamanddiu';
  }
  if (state === 'pondicherry') return 'puducherry';
  if (state === 'orissa') return 'odisha';
  if (state === 'uttaranchal') return 'uttarakhand';
  return state;
};

const cityAliases = {
  bangalore: ['bengaluru'],
  bengaluru: ['bangalore'],
  belgaum: ['belagavi'],
  belagavi: ['belgaum'],
  gulbarga: ['kalaburagi'],
  kalaburagi: ['gulbarga'],
  gurgaon: ['gurugram'],
  gurugram: ['gurgaon'],
  mysore: ['mysuru'],
  mysuru: ['mysore'],
  pondicherry: ['puducherry'],
  puducherry: ['pondicherry'],
  panaji: ['panjim'],
  panjim: ['panaji'],
  trivandrum: ['thiruvananthapuram'],
  thiruvananthapuram: ['trivandrum'],
};

const cityMatchesPostOffice = (city, office) => {
  const cityKey = normalize(city);
  const acceptedNames = [cityKey, ...(cityAliases[cityKey] || [])];
  const officeNames = [office.Name, office.District, office.Block].map(normalize);
  return acceptedNames.some((name) => officeNames.includes(name));
};

export async function validateIndianPincode(pincode, state, city) {
  const cleanPincode = String(pincode || '').trim();
  if (!/^\d{6}$/.test(cleanPincode)) {
    return { valid: false, message: 'Enter a valid 6-digit PIN code.' };
  }
  if (!state || !city) {
    return { valid: false, message: 'Select a state and city before verifying the PIN code.' };
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${cleanPincode}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Postal lookup failed');

    const [result] = await response.json();
    const offices = result?.Status === 'Success' && Array.isArray(result.PostOffice)
      ? result.PostOffice
      : [];
    if (offices.length === 0) {
      return { valid: false, message: 'This PIN code was not found.' };
    }

    const stateOffices = offices.filter((office) => (
      canonicalState(office.State) === canonicalState(state)
    ));
    if (stateOffices.length === 0) {
      return { valid: false, message: 'This PIN code does not match the selected state.' };
    }

    if (!stateOffices.some((office) => cityMatchesPostOffice(city, office))) {
      return { valid: false, message: 'This PIN code does not match the selected city.' };
    }

    return { valid: true, message: 'PIN code verified.' };
  } catch {
    return {
      valid: false,
      message: 'Could not verify the PIN code. Check your connection and try again.',
    };
  }
}