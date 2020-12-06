import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'urql';
import { makeSubject } from 'wonka';
import { shallow } from 'enzyme';
import { FormDisplay } from '../form-manager/FormDisplay';
import { MemoryRouter } from 'react-router-dom';

const { source: stream, next: pushResponse } = makeSubject();

const mockedClient = {
  executeQuery: jest.fn(() => stream),
};

it('displayed procedureId and name matches actual procedureId and name', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/formdisplay/12345']}>
    <Provider value={mockedClient}>
      <FormDisplay />
    </Provider>
    </MemoryRouter>
  );

  act(() => {
    pushResponse({
      data: {
        procedureID: "Surgery_CCO",
        name: "PKG_Lung_Surgery_CCO"
      },
    });
  });
  expect(wrapper.text().includes('Surgery_CCO'));
  expect(wrapper.text().includes('PKG_Lung_Surgery_CCO'));

});

it('displayed footer matches actual footer', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/formdisplay/12345']}>
    <Provider value={mockedClient}>
      <FormDisplay />
    </Provider>
    </MemoryRouter>
  );

  act(() => {
    pushResponse({
      data: {
        footer: "(c) 2018 College of American Pathologists.  All rights reserved.  License required for use."
      },
    });
  });
  expect(wrapper.text().includes('(c) 2018 College of American Pathologists.  All rights reserved.  License required for use.'));

});

it('displayed properties match actual properties', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/formdisplay/12345']}>
    <Provider value={mockedClient}>
      <FormDisplay />
    </Provider>
    </MemoryRouter>
  );
  
  act(() => {
    pushResponse({
      data: {
        title: "CCO Template for Lung Surgery",
        version: "1.0.0.DRAFT",
        lineage: "LungSurgCCO.358",
        patientID: "LS_2355"
      },
    });
  });
  expect(wrapper.text().includes('CCO Template for Lung Surgery'));
  expect(wrapper.text().includes('1.0.0.DRAFT'));
  expect(wrapper.text().includes('LungSurgCCO.358'));
  expect(wrapper.text().includes('LS_2355'));

});

it('displayed properties match actual properties', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/formdisplay/12345']}>
    <Provider value={mockedClient}>
      <FormDisplay />
    </Provider>
    </MemoryRouter>
  );
  
  act(() => {
    pushResponse({
      data: {
        title: "CCO Template for Lung Surgery",
        version: "1.0.0.DRAFT",
        lineage: "LungSurgCCO.358",
        patientID: "LS_2355"
      },
    });
  });
  expect(wrapper.text().includes('CCO Template for Lung Surgery'));
  expect(wrapper.text().includes('1.0.0.DRAFT'));
  expect(wrapper.text().includes('LungSurgCCO.358'));
  expect(wrapper.text().includes('LS_2355'));

});

it('displayed sections match actual sections', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/formdisplay/12345']}>
    <Provider value={mockedClient}>
      <FormDisplay />
    </Provider>
    </MemoryRouter>
  );
  
  act(() => {
    pushResponse({
      sections: 
        [
          {
            name: "S_76217",
            title: "Administration"
          },
          {
            name: "S_AKG_4",
            title: "Assistants"
          }
        ]
    });
  });
  expect(wrapper.text().includes('S_76217'));
  expect(wrapper.text().includes('Administration'));
  expect(wrapper.text().includes('S_AKG_4'));
  expect(wrapper.text().includes('Assistants'));

});

it('displayed questions match actual questions', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/formdisplay/12345']}>
    <Provider value={mockedClient}>
      <FormDisplay />
    </Provider>
    </MemoryRouter>
  );
  
  act(() => {
    pushResponse({
      questions: 
        [
          {
            name: "Q_76452",
            title: "Pre-Operative diagnosis (Indication for surgery)",
            questionType: "text"
          },
          {
            name: "Q_76447",
            title: "Post-Operative diangosis same as pre-operative diagnosis",
            questionType: "single choice"
          }
        ]
    });
  });
  expect(wrapper.text().includes('Q_76452'));
  expect(wrapper.text().includes('Pre-Operative diagnosis (Indication for surgery)'));
  expect(wrapper.text().includes('text'));
  expect(wrapper.text().includes('Q_76447'));
  expect(wrapper.text().includes('Post-Operative diangosis same as pre-operative diagnosis'));
  expect(wrapper.text().includes('single choice'));

});