/**
 * ScholarFly BD assessment form creation script.
 * Open https://script.google.com/ under the same Google account that should own student responses.
 * Paste this entire code into a NEW project, then run createScholarFlyAssessmentForm once.
 * Authorize Forms/Sheets/Drive access. Check execution log for responder + editor + spreadsheet URLs.
 * Do not run twice unless you want duplicate forms.
 */
function createScholarFlyAssessmentForm() {
  var form = FormApp.create('ScholarFly BD | Student Profile Assessment');
  form.setDescription('Tell us a little about your academic background and study plans. We review your information to provide relevant educational guidance. Admission, scholarships and funding cannot be guaranteed. Please do not upload sensitive identity or banking documents.');
  form.setConfirmationMessage('Thank you for reaching out to ScholarFly BD. Your assessment request has been received. We will review the information you have shared.');
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);
  form.setAllowResponseEdits(false);

  function short(q, req, help) {var x=form.addTextItem().setTitle(q).setRequired(Boolean(req)); if(help)x.setHelpText(help);}
  function long(q,req,help) {var x=form.addParagraphTextItem().setTitle(q).setRequired(Boolean(req)); if(help)x.setHelpText(help);}
  function choose(q,arr,req){form.addMultipleChoiceItem().setTitle(q).setChoiceValues(arr).setRequired(Boolean(req));}
  function check(q,arr,req){form.addCheckboxItem().setTitle(q).setChoiceValues(arr).setRequired(Boolean(req));}
  function page(t,d){form.addPageBreakItem().setTitle(t).setHelpText(d||'');}

  form.addSectionHeaderItem().setTitle('1. Personal details');
  short('Full name (as in your academic certificates)',true);
  short('Email address',true,'Enter an address you check regularly.');
  short('WhatsApp number, including country code',true,'Example: +8801... or +8210...');
  short('Nationality',true);
  short('Country of residence',true);
  short('Current institution / occupation',false);
  choose('Highest completed qualification',['SSC / O-Level','HSC / A-Level','Bachelor’s','Master’s','PhD / Doctorate','Other'],true);

  page('2. School and college education','If an item does not apply, leave it blank.');
  short('SSC / O-Level: institution and group / stream',false);
  short('SSC / O-Level: passing year',false);
  short('SSC / O-Level: GPA or result and grading scale',false);
  short('HSC / A-Level: institution and group / stream',false);
  short('HSC / A-Level: passing year',false);
  short('HSC / A-Level: GPA or result and grading scale',false);

  page('3. Higher education','Record each completed degree; use N/A where appropriate.');
  short('Bachelor’s degree title (e.g. BSc, BSS, BPharm, BA)',false);
  short('Bachelor’s subject / major',false);
  short('Bachelor’s university and country',false);
  short('Bachelor’s graduation year (or expected year)',false);
  short('Bachelor’s CGPA / GPA and grading scale',false,'Example: 3.50 out of 4.00 or 75 out of 100');
  short('Master’s degree title (e.g. MSc, MSS, MA, MBA)',false);
  short('Master’s subject / major',false);
  short('Master’s university and country',false);
  short('Master’s graduation year (or expected year)',false);
  short('Master’s CGPA / GPA and grading scale',false);
  short('PhD or other higher degree: field, university and graduation year (if applicable)',false);
  long('Any gap in education or change of subject you want us to understand?',false);

  page('4. Research, work and achievements');
  long('Undergraduate / Master’s / PhD thesis title and research summary',false);
  long('Research interests / intended area of study',false);
  short('Publications (number, DOI, Google Scholar or ORCID links)',false);
  long('Research skills / laboratory, technical or analytical experience',false);
  long('Employment, internship and volunteer experience',false);
  long('Awards, distinctions and notable achievements',false);

  page('5. Language proficiency and admission tests');
  choose('English test status',['IELTS','TOEFL','Duolingo English Test','Medium of Instruction certificate','Not taken yet','Other'],false);
  short('English test score and date (if any)',false);
  short('GRE / GMAT / SAT / other exam and score (if any)',false);
  short('Other language proficiency (TOPIK, JLPT, etc.)',false);

  page('6. Study plans and funding');
  choose('Target programme',['Bachelor’s','Master’s','Integrated MS/PhD','PhD','Postdoctoral research','Other / not sure'],true);
  check('Preferred destinations',['USA','Canada','UK','Germany','South Korea','Japan','China','Australia','European Union / Europe','Other','Not decided'],true);
  short('Other preferred destination(s)',false);
  long('Preferred subject / field / academic interests',true);
  short('Preferred intake (year and semester / month)',false);
  check('Funding preference',['Government scholarship','University award','Professor / laboratory funding','Research assistantship','Any fully funded route','Partial funding acceptable','Not sure yet'],true);
  long('Universities or professors you are interested in (optional)',false);
  long('Your main goals or questions for our team',true);

  page('7. CV link and additional details');
  short('CV sharing link (Google Drive or similar, optional)',false,'Set access to restricted sharing with the review team, not public. You may also email your CV if requested.');
  long('Anything else we should know?',false);
  form.addCheckboxItem().setTitle('I confirm that the information is accurate to the best of my knowledge.').setChoiceValues(['I confirm']).setRequired(true);
  form.addCheckboxItem().setTitle('I consent to ScholarFly BD processing my submitted information to review my profile and respond to my enquiry.').setChoiceValues(['I agree to the stated purpose and privacy notice']).setRequired(true);

  var sheet=SpreadsheetApp.create('ScholarFly BD | Student Assessment Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET,sheet.getId());
  // Installable trigger: runs only when the owner authorizes this script.
  // The trigger sends an email notification; full personal responses remain in the private Sheet.
  ScriptApp.newTrigger('notifyScholarFlyAssessment').forForm(form).onFormSubmit().create();
  Logger.log('FORM (student): '+form.getPublishedUrl());
  Logger.log('FORM (edit): '+form.getEditUrl());
  Logger.log('PRIVATE RESPONSE SHEET: '+sheet.getUrl());
}


/**
 * Email notification for newly submitted student profiles.
 * Requires the form creator to authorize Gmail/MailApp when running setup.
 */
function notifyScholarFlyAssessment(e) {
  var answers = (e && e.response) ? e.response.getItemResponses() : [];
  var get = function(title) {
    var found = answers.find(function(x){ return x.getItem().getTitle()===title; });
    return found ? String(found.getResponse()) : '';
  };
  var applicantName = get('Full name (as in your academic certificates)') || 'New applicant';
  var applicantEmail = get('Email address');
  var degree = get('Target programme') || 'Not specified';
  var recipient = 'scholarflybd@gmail.com';
  var msg = 'A new ScholarFly BD profile assessment has been submitted.\n\n' +
    'Applicant: '+applicantName+'\n' +
    'Email: '+applicantEmail+'\n' +
    'Target programme: '+degree+'\n\n' +
    'Please review all answers in the private Google Sheets response spreadsheet.\n' +
    'Do not forward student personal information without a lawful basis.\n';
  MailApp.sendEmail(recipient,'New ScholarFly BD assessment: '+applicantName,msg);
  // Send acknowledgement if the student supplied an email. Does not imply assessment completion.
  if (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(applicantEmail)) {
    MailApp.sendEmail(applicantEmail,'ScholarFly BD | Assessment received',
      'Hello '+applicantName+',\n\nThank you for submitting your academic profile to ScholarFly BD. Your information has been received for review. We will contact you if any additional information is needed.\n\nBest regards,\nScholarFly BD\nscholarflybd@gmail.com');
  }
}
