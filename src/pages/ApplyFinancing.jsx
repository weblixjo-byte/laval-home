import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../client';
import { 
  User, MapPin, Briefcase, Building, Shield, 
  ChevronRight, ChevronLeft, Printer, CheckCircle2, Lock
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const STEPS = [
  { id: 1, title: 'Client Info', icon: User },
  { id: 2, title: 'Residential History', icon: MapPin },
  { id: 3, title: 'Financial Profile', icon: Briefcase },
  { id: 4, title: 'Property & Financing', icon: Building },
  { id: 5, title: 'Consent & Submit', icon: Shield }
];

// Fixed key mapping for URL-safe Base64 serialization
const KEY_MAP = {
  firstName: 'a',
  middleInitial: 'b',
  lastName: 'c',
  dob: 'd',
  ssn: 'e',
  email: 'f',
  phone: 'g',
  maritalStatus: 'h',
  streetAddress: 'i',
  aptUnit: 'j',
  city: 'k',
  state: 'l',
  zipCode: 'm',
  residenceType: 'n',
  monthlyPayment: 'o',
  yearsAtAddress: 'p',
  monthsAtAddress: 'q',
  prevStreetAddress: 'r',
  prevAptUnit: 's',
  prevCity: 't',
  prevState: 'u',
  prevZipCode: 'v',
  prevYearsAtAddress: 'w',
  prevMonthsAtAddress: 'x',
  employmentStatus: 'y',
  employerName: 'z',
  jobTitle: 'A',
  workPhone: 'B',
  monthlyIncome: 'C',
  liquidAssets: 'D',
  yearsAtJob: 'E',
  monthsAtJob: 'F',
  prevEmployerName: 'G',
  prevJobTitle: 'H',
  prevMonthlyIncome: 'I',
  prevYearsAtJob: 'J',
  prevMonthsAtJob: 'K',
  propertySelection: 'L',
  propertyName: 'M',
  loanAmount: 'N',
  downPayment: 'O',
  financingType: 'P',
  signature: 'Q'
};

const serializeData = (data, propertyName) => {
  const obj = {};
  Object.keys(KEY_MAP).forEach((key) => {
    let val = key === 'propertyName' ? (propertyName || '') : (data[key] || '');
    if (val !== undefined && val !== null && val !== '') {
      obj[KEY_MAP[key]] = val;
    }
  });
  const jsonStr = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(jsonStr);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const deserializeData = (base64Str) => {
  try {
    let normalized = base64Str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = normalized.length % 4;
    if (pad === 2) normalized += '==';
    else if (pad === 3) normalized += '=';
    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder().decode(bytes);
    const obj = JSON.parse(decoded);
    const data = {};
    Object.keys(KEY_MAP).forEach((key) => {
      const shortKey = KEY_MAP[key];
      data[key] = obj[shortKey] !== undefined ? obj[shortKey] : '';
    });
    return data;
  } catch (err) {
    console.error("Error decoding mortgage application parameters:", err);
    return null;
  }
};

// Single-page A4 print layout
const PrintSummary = ({ data }) => {
  const formatSSN = (ssn) => {
    if (!ssn) return '';
    const clean = ssn.replace(/\D/g, '');
    if (clean.length === 9) {
      return `${clean.slice(0, 3)}-${clean.slice(3, 5)}-${clean.slice(5)}`;
    }
    return ssn;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const yearsAtAddress = parseInt(data.yearsAtAddress, 10) || 0;
  const monthsAtAddress = parseInt(data.monthsAtAddress, 10) || 0;
  const isAddressShort = (yearsAtAddress * 12 + monthsAtAddress) < 24;

  const yearsAtJob = parseInt(data.yearsAtJob, 10) || 0;
  const monthsAtJob = parseInt(data.monthsAtJob, 10) || 0;
  const isEmploymentShort = (yearsAtJob * 12 + monthsAtJob) < 24;

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #111',
    marginTop: '3px',
    marginBottom: '8px'
  };

  const headerBlockStyle = {
    backgroundColor: '#f3f4f6',
    border: '1px solid #111',
    padding: '4px 8px',
    fontWeight: 'bold',
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontFamily: "'IBM Plex Sans', -apple-system, sans-serif"
  };

  const labelStyle = {
    border: '1px solid #111',
    padding: '4px 7px',
    fontWeight: 'bold',
    fontSize: '8px',
    textTransform: 'uppercase',
    color: '#374151',
    backgroundColor: '#fafafa',
    width: '22%',
    fontFamily: "'IBM Plex Sans', -apple-system, sans-serif"
  };

  const valueStyle = {
    border: '1px solid #111',
    padding: '4px 7px',
    fontSize: '9.5px',
    fontWeight: '500',
    color: '#000',
    width: '28%',
    fontFamily: "'IBM Plex Sans', -apple-system, sans-serif"
  };

  const valueSpanStyle = {
    border: '1px solid #111',
    padding: '4px 7px',
    fontSize: '9.5px',
    fontWeight: '500',
    color: '#000',
    fontFamily: "'IBM Plex Sans', -apple-system, sans-serif"
  };

  return (
    <div style={{ padding: '12px', backgroundColor: '#fff', minHeight: '100vh', color: '#000' }} className="print-container">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body, html, #root, main, .print-container, #root > div {
            display: block !important;
            position: static !important;
            height: auto !important;
            min-height: 0 !important;
            background-color: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: auto !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 0.8cm 1.0cm;
          }
        }
      `}} />

      {/* Printing Toolbar */}
      <div className="no-print" style={{
        maxWidth: '750px',
        margin: '0 auto 16px auto',
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        fontFamily: "'IBM Plex Sans', sans-serif"
      }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111827' }}>
            Laval Luxury Homes | Mortgage Assessment Desk
          </h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#6b7280' }}>
            Formatted specifically for single-page A4 lender assessment. Click print button if dialog closed.
          </p>
        </div>
        <button 
          onClick={() => window.print()}
          style={{
            backgroundColor: '#0D0E10',
            color: '#fff',
            border: 'none',
            padding: '7px 14px',
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Printer size={13} /> Print Document
        </button>
      </div>

      {/* Mortgage Application Sheet */}
      <div style={{ maxWidth: '750px', margin: '0 auto', backgroundColor: '#fff', fontFamily: "'IBM Plex Sans', sans-serif" }}>
        
        {/* Title Header */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'top', padding: 0 }}>
                <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Laval Luxury Homes
                </h1>
                <p style={{ margin: '2px 0 0 0', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#4b5563', fontWeight: '600' }}>
                  Private Client Mortgage & Acquisition Assessment | Confidential Underwriting
                </p>
              </td>
              <td style={{ textAlign: 'right', verticalAlign: 'top', padding: 0 }}>
                <span style={{ fontSize: '7.5px', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: '#000', color: '#fff', padding: '3px 6px', letterSpacing: '1px' }}>
                  Underwriter Confidential
                </span>
                <p style={{ margin: '4px 0 0 0', fontSize: '8px', fontFamily: 'monospace', color: '#4b5563' }}>
                  REF: #{data.lastName?.slice(0, 3).toUpperCase() || 'LLH'}-{new Date().getFullYear()}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 1: Client Info */}
        <div style={headerBlockStyle}>1. Primary Applicant Identification</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Full Legal Name</td>
              <td style={valueSpanStyle} colSpan="3">{data.firstName} {data.middleInitial ? data.middleInitial + '. ' : ''}{data.lastName}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Social Security / ID</td>
              <td style={{ ...valueStyle, fontWeight: 'bold', fontFamily: 'monospace' }}>{formatSSN(data.ssn)}</td>
              <td style={labelStyle}>Date of Birth</td>
              <td style={valueStyle}>{data.dob}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Primary Phone</td>
              <td style={valueStyle}>{data.phone}</td>
              <td style={labelStyle}>Email Address</td>
              <td style={valueStyle}>{data.email}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Marital Status</td>
              <td style={valueSpanStyle} colSpan="3">{data.maritalStatus}</td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 2: Housing */}
        <div style={headerBlockStyle}>2. Residential History</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Current Address</td>
              <td style={valueSpanStyle} colSpan="3">
                {data.streetAddress}{data.aptUnit ? ' Apt/Unit ' + data.aptUnit : ''}, {data.city}, {data.state} {data.zipCode}
              </td>
            </tr>
            <tr>
              <td style={labelStyle}>Housing Status</td>
              <td style={valueStyle}>{data.residenceType}</td>
              <td style={labelStyle}>Monthly Housing Cost</td>
              <td style={valueStyle}>${data.monthlyPayment} / month</td>
            </tr>
            <tr>
              <td style={labelStyle}>Time at Residence</td>
              <td style={valueSpanStyle} colSpan="3">{data.yearsAtAddress} Years, {data.monthsAtAddress || 0} Months</td>
            </tr>
            {isAddressShort && (
              <tr>
                <td style={labelStyle}>Previous Address</td>
                <td style={{ ...valueSpanStyle, fontSize: '8.5px', color: '#374151' }} colSpan="3">
                  {data.prevStreetAddress}{data.prevAptUnit ? ' Apt ' + data.prevAptUnit : ''}, {data.prevCity}, {data.prevState} {data.prevZipCode} (Duration: {data.prevYearsAtAddress} Y, {data.prevMonthsAtAddress || 0} M)
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* SECTION 3: Financial & Liquidity Profile */}
        <div style={headerBlockStyle}>3. Financial, Asset & Employment Profile</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Current Employer / Firm</td>
              <td style={valueStyle}>{data.employerName}</td>
              <td style={labelStyle}>Title / Position</td>
              <td style={valueStyle}>{data.jobTitle}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Employment Status</td>
              <td style={valueStyle}>{data.employmentStatus}</td>
              <td style={labelStyle}>Business Phone</td>
              <td style={valueStyle}>{data.workPhone || 'N/A'}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Gross Monthly Income</td>
              <td style={{ ...valueStyle, fontWeight: 'bold' }}>
                ${data.monthlyIncome && !isNaN(parseFloat(data.monthlyIncome)) ? parseFloat(data.monthlyIncome).toLocaleString() : '0'}
              </td>
              <td style={labelStyle}>Liquid Assets / Reserves</td>
              <td style={{ ...valueStyle, fontWeight: 'bold' }}>
                ${data.liquidAssets && !isNaN(parseFloat(data.liquidAssets)) ? parseFloat(data.liquidAssets).toLocaleString() : 'N/A'}
              </td>
            </tr>
            <tr>
              <td style={labelStyle}>Time with Organization</td>
              <td style={valueSpanStyle} colSpan="3">{data.yearsAtJob} Years, {data.monthsAtJob || 0} Months</td>
            </tr>
            {isEmploymentShort && (
              <tr>
                <td style={labelStyle}>Previous Organization</td>
                <td style={{ ...valueSpanStyle, fontSize: '8.5px', color: '#374151' }} colSpan="3">
                  {data.prevEmployerName} - {data.prevJobTitle} (Gross: ${data.prevMonthlyIncome && !isNaN(parseFloat(data.prevMonthlyIncome)) ? parseFloat(data.prevMonthlyIncome).toLocaleString() : '0'}/mo, Duration: {data.prevYearsAtJob} Y, {data.prevMonthsAtJob || 0} M)
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* SECTION 4: Property & Acquisition Details */}
        <div style={headerBlockStyle}>4. Property Acquisition & Loan Structure</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Property of Interest</td>
              <td style={{ ...valueSpanStyle, fontWeight: 'bold' }} colSpan="3">{data.propertyName || 'General Portfolio Pre-Approval'}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Est. Financing Amount</td>
              <td style={{ ...valueStyle, fontWeight: 'bold' }}>${data.loanAmount && !isNaN(parseFloat(data.loanAmount)) ? parseFloat(data.loanAmount).toLocaleString() : '0'}</td>
              <td style={labelStyle}>Planned Down Payment</td>
              <td style={{ ...valueStyle, fontWeight: 'bold' }}>${data.downPayment && !isNaN(parseFloat(data.downPayment)) ? parseFloat(data.downPayment).toLocaleString() : '0'}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Financing Program</td>
              <td style={valueSpanStyle} colSpan="3">{data.financingType || 'Jumbo Residential Mortgage'}</td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 5: Legal & Authorization */}
        <div style={headerBlockStyle}>5. Authorizations & Disclosures</div>
        <div style={{
          border: '1px solid #111',
          borderTop: 'none',
          padding: '6px 8px',
          fontSize: '7.5px',
          color: '#4b5563',
          lineHeight: '1.25',
          textAlign: 'justify',
          marginBottom: '8px'
        }}>
          By signing below, the applicant authorizes Laval Luxury Homes and its designated institutional lending partners to obtain credit bureau reports and verify all financial information provided on this pre-approval assessment. The applicant certifies that all entries are truthful and complete. This inquiry is processed initially as a confidential assessment and will not alter official public credit standings without written consent.
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #111' }}>
          <tbody>
            <tr>
              <td style={{ width: '60%', borderRight: '1px solid #111', padding: '8px', verticalAlign: 'top' }}>
                <span style={{ fontSize: '7px', textTransform: 'uppercase', fontWeight: 'bold', color: '#6b7280' }}>
                  Applicant Digital Signature
                </span>
                <div style={{
                  fontSize: '13px',
                  fontStyle: 'italic',
                  color: '#000',
                  marginTop: '8px',
                  borderBottom: '1px solid #d1d5db',
                  paddingBottom: '2px'
                }}>
                  {data.signature}
                </div>
              </td>
              <td style={{ width: '40%', padding: '8px', verticalAlign: 'top' }}>
                <span style={{ fontSize: '7px', textTransform: 'uppercase', fontWeight: 'bold', color: '#6b7280' }}>
                  Submission Date
                </span>
                <div style={{
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: '#000',
                  marginTop: '10px',
                  borderBottom: '1px solid #d1d5db',
                  paddingBottom: '2px'
                }}>
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '7px', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.8px' }}>
          * CONFIDENTIAL DOCUMENT FOR LENDER MORTGAGE PRE-APPROVAL ONLY *
        </div>

      </div>
    </div>
  );
};

const ApplyFinancing = () => {
  const [isPrintMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return !!params.get('d');
  });
  const [printData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get('d');
    return d ? deserializeData(d) : null;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [properties, setProperties] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    dob: '',
    ssn: '',
    email: '',
    phone: '',
    maritalStatus: 'Single',

    streetAddress: '',
    aptUnit: '',
    city: '',
    state: 'GA',
    zipCode: '',
    residenceType: 'Own',
    monthlyPayment: '',
    yearsAtAddress: '',
    monthsAtAddress: '',
    
    prevStreetAddress: '',
    prevAptUnit: '',
    prevCity: '',
    prevState: '',
    prevZipCode: '',
    prevYearsAtAddress: '',
    prevMonthsAtAddress: '',

    employmentStatus: 'Executive / Employed',
    employerName: '',
    jobTitle: '',
    workPhone: '',
    monthlyIncome: '',
    liquidAssets: '',
    yearsAtJob: '',
    monthsAtJob: '',
    
    prevEmployerName: '',
    prevJobTitle: '',
    prevMonthlyIncome: '',
    prevYearsAtJob: '',
    prevMonthsAtJob: '',

    propertySelection: 'general',
    loanAmount: '',
    downPayment: '',
    financingType: 'Jumbo Residential Mortgage',

    creditConsent: false,
    signature: ''
  });

  useEffect(() => {
    if (isPrintMode) return;
    const fetchProperties = async () => {
      try {
        const query = `*[_type == "property" && isSold != true] | order(title asc) {
          "id": _id,
          title,
          propertyType,
          price,
          priceDisplayMode
        }`;
        const data = await client.fetch(query);
        if (data) {
          setProperties(data);
        }
      } catch (err) {
        console.error("Error fetching properties for pre-approval:", err);
      }
    };
    fetchProperties();
  }, [isPrintMode]);

  if (isPrintMode && printData) {
    return <PrintSummary data={printData} />;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isAddressHistoryShort = () => {
    const years = parseInt(formData.yearsAtAddress || 0, 10);
    const months = parseInt(formData.monthsAtAddress || 0, 10);
    return (years * 12 + months) < 24;
  };

  const isEmploymentHistoryShort = () => {
    const years = parseInt(formData.yearsAtJob || 0, 10);
    const months = parseInt(formData.monthsAtJob || 0, 10);
    return (years * 12 + months) < 24;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.dob && formData.ssn && formData.email && formData.phone;
      case 2:
        if (!formData.streetAddress || !formData.city || !formData.state || !formData.zipCode || !formData.residenceType || !formData.monthlyPayment || formData.yearsAtAddress === '') {
          return false;
        }
        if (isAddressHistoryShort()) {
          return formData.prevStreetAddress && formData.prevCity && formData.prevZipCode && formData.prevYearsAtAddress !== '';
        }
        return true;
      case 3:
        if (!formData.employmentStatus || !formData.employerName || !formData.jobTitle || !formData.monthlyIncome || formData.yearsAtJob === '') {
          return false;
        }
        if (isEmploymentHistoryShort()) {
          return formData.prevEmployerName && formData.prevJobTitle && formData.prevMonthlyIncome && formData.prevYearsAtJob !== '';
        }
        return true;
      case 4:
        return formData.loanAmount && formData.downPayment;
      case 5:
        return formData.creditConsent && formData.signature;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) {
      setSubmitError("Please confirm authorization and provide your digital signature.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    let propertyName = "General Portfolio Pre-Approval";
    if (formData.propertySelection && formData.propertySelection !== 'general') {
      const selected = properties.find((p) => p.id === formData.propertySelection);
      if (selected) {
        propertyName = selected.title || selected.name;
      }
    }

    const compressedCode = serializeData(formData, propertyName);
    const printUrl = `${window.location.origin}/apply-financing?d=${compressedCode}`;

    const submissionBody = new FormData();
    submissionBody.append("access_key", WEB3FORMS_ACCESS_KEY);
    submissionBody.append("subject", `LAVAL MORTGAGE PRE-APPROVAL: ${formData.firstName} ${formData.lastName}`);
    submissionBody.append("from_name", "Laval Luxury Homes Mortgage Desk");
    submissionBody.append("Print Assessment Link", printUrl);

    const fieldsToSubmit = {
      "Full Name": `${formData.firstName} ${formData.middleInitial ? formData.middleInitial + ' ' : ''}${formData.lastName}`,
      "Date of Birth": formData.dob,
      "Social Security Number": formData.ssn,
      "Email Address": formData.email,
      "Phone Number": formData.phone,
      "Marital Status": formData.maritalStatus,
      "Current Residence": `${formData.streetAddress} ${formData.aptUnit ? 'Apt ' + formData.aptUnit : ''}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      "Housing Status": formData.residenceType,
      "Monthly Housing Payment": `$${formData.monthlyPayment}`,
      "Time at Residence": `${formData.yearsAtAddress} Years, ${formData.monthsAtAddress || 0} Months`,
      "Employment Status": formData.employmentStatus,
      "Employer / Firm": formData.employerName,
      "Position / Title": formData.jobTitle,
      "Gross Monthly Income": `$${formData.monthlyIncome}`,
      "Liquid Assets / Reserves": `$${formData.liquidAssets || 'N/A'}`,
      "Property of Interest": propertyName,
      "Estimated Loan Amount": `$${formData.loanAmount}`,
      "Proposed Down Payment": `$${formData.downPayment}`,
      "Financing Program": formData.financingType,
      "Underwriting Consent": formData.creditConsent ? "AUTHORIZED" : "DECLINED",
      "Digital Signature": formData.signature,
      "Submission Date": new Date().toLocaleString()
    };

    Object.entries(fieldsToSubmit).forEach(([key, val]) => {
      submissionBody.append(key, val);
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionBody
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        setSubmitError("Failed to submit assessment. Please check your entries and try again.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Network error. Please verify your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 pt-28 md:pt-36 pb-24 font-sans text-neutral-900">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Laval Luxury Homes
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Luxury Mortgage Pre-Approval Desk
          </h1>
          <p className="text-xs md:text-sm font-light text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Confidential 5-step pre-approval assessment. Bank-ready 1-page A4 printout formatted for institutional underwriters.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xl overflow-hidden">
          
          {/* Progress Header */}
          <div className="bg-neutral-50 border-b border-neutral-100 px-6 py-6 md:px-10">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-[#D4AF37] -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              ></div>
              
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;

                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border text-xs font-semibold ${
                        isCompleted 
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-neutral-950 shadow-xs' 
                          : isActive 
                            ? 'bg-neutral-950 border-neutral-950 text-white scale-110 shadow-md' 
                            : 'bg-white border-neutral-300 text-neutral-400'
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                    <span 
                      className={`text-[10px] uppercase tracking-wider font-semibold mt-2 hidden md:block ${
                        isActive ? 'text-neutral-900' : 'text-neutral-400 font-normal'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Body */}
          <div className="px-6 py-8 md:px-12 md:py-10">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-5 max-w-md mx-auto"
              >
                <div className="w-16 h-16 bg-amber-50 text-[#D4AF37] rounded-full flex items-center justify-center text-3xl mx-auto border border-amber-200/60 shadow-xs">
                  ✓
                </div>
                <h2 className="text-2xl font-semibold text-neutral-900">Application Transmitted</h2>
                <p className="text-neutral-500 text-xs leading-relaxed font-light">
                  Thank you for submitting your mortgage pre-approval application to Laval Luxury Homes. Our private client financing director will review your dossier and contact you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-neutral-900 text-white hover:bg-[#D4AF37] transition-colors"
                  >
                    Submit New Application
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={currentStep === 5 ? handleSubmit : handleNextStep} className="space-y-6">
                
                {/* STEP 1: Personal Info */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
                    <div className="border-b border-neutral-100 pb-3">
                      <h3 className="text-base font-semibold text-neutral-900">1. Client Identification</h3>
                      <p className="text-xs text-neutral-400 font-light">Enter legal identification details for underwriter credit assessment.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">First Name *</label>
                        <input name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. Alexander" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Middle Initial</label>
                        <input name="middleInitial" value={formData.middleInitial} onChange={handleInputChange} maxLength="1" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. J" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Last Name *</label>
                        <input name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. Vance" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Date of Birth (MM/DD/YYYY) *</label>
                        <input name="dob" type="date" required value={formData.dob} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Social Security / Tax ID *</label>
                        <input name="ssn" required value={formData.ssn} onChange={handleInputChange} placeholder="XXX-XX-XXXX" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Email Address *</label>
                        <input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="vance@private.com" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Primary Phone *</label>
                        <input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="+1 (404) 555-0199" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Marital Status</label>
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]">
                          <option value="Married">Married</option>
                          <option value="Single">Single</option>
                          <option value="Separated">Separated</option>
                          <option value="Trust / Entity">Trust / LLC Entity</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Residential History */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
                    <div className="border-b border-neutral-100 pb-3">
                      <h3 className="text-base font-semibold text-neutral-900">2. Residential History</h3>
                      <p className="text-xs text-neutral-400 font-light">Current and previous address history for institutional verification.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Street Address *</label>
                        <input name="streetAddress" required value={formData.streetAddress} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. 110 Mansell Cir" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Apt / Suite / Unit</label>
                        <input name="aptUnit" value={formData.aptUnit} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="Suite 306" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">City *</label>
                        <input name="city" required value={formData.city} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="Roswell" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">State *</label>
                        <input name="state" required value={formData.state} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="GA" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Zip Code *</label>
                        <input name="zipCode" required value={formData.zipCode} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="30075" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Housing Status *</label>
                        <select name="residenceType" value={formData.residenceType} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]">
                          <option value="Own (No Mortgage)">Own (Free & Clear)</option>
                          <option value="Own (Mortgaged)">Own (Mortgaged)</option>
                          <option value="Rent">Rent</option>
                          <option value="Family / Other">Family / Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Monthly Payment ($) *</label>
                        <input name="monthlyPayment" type="number" required value={formData.monthlyPayment} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. 4500" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Years *</label>
                          <input name="yearsAtAddress" type="number" required value={formData.yearsAtAddress} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="3" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Months</label>
                          <input name="monthsAtAddress" type="number" value={formData.monthsAtAddress} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="6" />
                        </div>
                      </div>
                    </div>

                    {isAddressHistoryShort() && (
                      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-900 block">
                          Previous Address Required (Less than 2 years at current address)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input name="prevStreetAddress" placeholder="Previous Street Address" value={formData.prevStreetAddress} onChange={handleInputChange} className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs" />
                          <input name="prevCity" placeholder="City" value={formData.prevCity} onChange={handleInputChange} className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs" />
                          <input name="prevZipCode" placeholder="Zip" value={formData.prevZipCode} onChange={handleInputChange} className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: Financial & Liquidity Profile */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
                    <div className="border-b border-neutral-100 pb-3">
                      <h3 className="text-base font-semibold text-neutral-900">3. Financial & Liquidity Profile</h3>
                      <p className="text-xs text-neutral-400 font-light">Document income stream and liquid reserves for jumbo underwriting tier.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Employment Status *</label>
                        <select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]">
                          <option value="Executive / Employed">Executive / Corporate Officer</option>
                          <option value="Business Owner / Partner">Business Owner / Principal</option>
                          <option value="Self-Employed">Self-Employed Professional</option>
                          <option value="Private Investor">Private Investor / Capital</option>
                          <option value="Retired">Retired / Family Office</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Employer / Firm Name *</label>
                        <input name="employerName" required value={formData.employerName} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. Vance Capital Partners" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Title / Position *</label>
                        <input name="jobTitle" required value={formData.jobTitle} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. Managing Director" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Gross Monthly Income ($) *</label>
                        <input name="monthlyIncome" type="number" required value={formData.monthlyIncome} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. 45000" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Liquid Assets / Reserves ($)</label>
                        <input name="liquidAssets" type="number" value={formData.liquidAssets} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. 1500000" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Years *</label>
                          <input name="yearsAtJob" type="number" required value={formData.yearsAtJob} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="5" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Months</label>
                          <input name="monthsAtJob" type="number" value={formData.monthsAtJob} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="0" />
                        </div>
                      </div>
                    </div>

                    {isEmploymentHistoryShort() && (
                      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-900 block">
                          Previous Employment Required (Less than 2 years in current role)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input name="prevEmployerName" placeholder="Previous Employer / Firm" value={formData.prevEmployerName} onChange={handleInputChange} className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs" />
                          <input name="prevJobTitle" placeholder="Previous Title" value={formData.prevJobTitle} onChange={handleInputChange} className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 4: Property & Acquisition Details */}
                {currentStep === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
                    <div className="border-b border-neutral-100 pb-3">
                      <h3 className="text-base font-semibold text-neutral-900">4. Property Acquisition Structure</h3>
                      <p className="text-xs text-neutral-400 font-light">Select property and structure financing terms.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block">Property of Interest</label>
                      <select name="propertySelection" value={formData.propertySelection} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#D4AF37]">
                        <option value="general">General Portfolio Pre-Approval (No Specific Property)</option>
                        {properties.map((prop) => (
                          <option key={prop.id} value={prop.id}>
                            {prop.title || prop.name} — {prop.propertyType || 'Residence'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Estimated Loan Amount ($) *</label>
                        <input name="loanAmount" type="number" required value={formData.loanAmount} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. 3000000" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Proposed Down Payment ($) *</label>
                        <input name="downPayment" type="number" required value={formData.downPayment} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]" placeholder="e.g. 1000000" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Preferred Financing Program</label>
                      <select name="financingType" value={formData.financingType} onChange={handleInputChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#D4AF37]">
                        <option value="Jumbo Residential Mortgage">Jumbo Residential Mortgage (Fixed / ARM)</option>
                        <option value="Private Portfolio Bank Loan">Private Banking Portfolio Loan (Asset-Backed)</option>
                        <option value="Bridge Liquidity Financing">Short-Term Bridge Financing</option>
                        <option value="Trust / Entity Structured Loan">Trust / LLC Corporate Entity Financing</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: Consent & Submit */}
                {currentStep === 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
                    <div className="border-b border-neutral-100 pb-3">
                      <h3 className="text-base font-semibold text-neutral-900">5. Underwriting Disclosures & Digital Signature</h3>
                      <p className="text-xs text-neutral-400 font-light">Confirm authorizations and apply electronic signature.</p>
                    </div>

                    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-600 font-light leading-relaxed">
                      By submitting this application, you authorize Laval Luxury Homes and its institutional underwriting lenders to obtain necessary consumer credit and asset verification reports. All disclosures remain encrypted and confidential under the Gramm-Leach-Bliley Financial Privacy Act.
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        id="creditConsent" 
                        name="creditConsent"
                        checked={formData.creditConsent}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#D4AF37] w-4 h-4 rounded cursor-pointer" 
                      />
                      <label htmlFor="creditConsent" className="text-xs text-neutral-700 leading-snug cursor-pointer font-light">
                        I hereby authorize Laval Luxury Homes and its affiliated lenders to review my creditworthiness and process this pre-approval request. *
                      </label>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">
                        Applicant Digital Signature (Type Full Legal Name) *
                      </label>
                      <input 
                        name="signature" 
                        required 
                        value={formData.signature} 
                        onChange={handleInputChange} 
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-base italic outline-none focus:border-[#D4AF37]" 
                        placeholder="e.g. Alexander J. Vance" 
                      />
                    </div>

                    {submitError && (
                      <p className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 font-medium">
                        {submitError}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Form Navigation Controls */}
                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-2.5 border border-neutral-300 rounded-full text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:border-neutral-900 transition-colors flex items-center gap-1.5"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                  ) : <div></div>}

                  {currentStep < 5 ? (
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-neutral-900 text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-[#D4AF37] transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      Continue <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-[#D4AF37] text-neutral-950 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#C5A059] transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      <Lock size={13} /> {isSubmitting ? 'Transmitting Assessment...' : 'Submit Pre-Approval Application'}
                    </button>
                  )}
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyFinancing;
