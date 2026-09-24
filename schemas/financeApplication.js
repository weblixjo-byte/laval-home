export default {
  name: 'financeApplication',
  title: 'Mortgage Pre-Approvals',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Applicant Full Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'propertyName',
      title: 'Property of Interest',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'loanAmount',
      title: 'Estimated Loan / Financing Amount',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'printUrl',
      title: 'Print Application (Click to Print on 1 Page)',
      type: 'url',
      description: 'Opens the bank-ready 1-page A4 mortgage assessment print desk.',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'propertyName',
      date: 'submittedAt',
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('en-US') : '';
      return {
        title: title || 'Private Client Application',
        subtitle: `${subtitle || 'General Pre-Approval'} - ${formattedDate}`,
      };
    },
  },
};
