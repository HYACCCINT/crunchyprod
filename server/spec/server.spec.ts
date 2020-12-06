import server from '../src/server'
import {} from 'jasmine'
import request from 'supertest'
import {database} from '../src/database'

const xml = 
`
<FormDesign xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ID="parse-form-test" baseURI="cancercare.on.ca" fullURI="_baseURI=cancercare.on.ca&amp;_lineage=LungSurgCCO.358&amp;_version=0.1.0.DRAFT&amp;_docType=sdcFDF" formTitle="Parse Form Test" lineage="LungSurgCCO.358" filename="xml.string" version="0.1.0.DRAFT" xmlns="urn:ihe:qrph:sdc:2016">
    <Property name="OfficialName" type="CAPeCC_meta" propName="OfficialName" val="Lung Surgery CCO" />
    <Property name="ShortName" type="CAPeCC_meta" propName="ShortName" val="LungSurgCCO" />
    <Body name="Body" ID="LungSurgCCO.357_1.0.0.DRAFT_sdcFDF_Body">
        <ChildItems name="ch_Body">
            <DisplayedItem name="DI_76024" ID="76024.100004300" title="#This template applies to lung cancer surgeries  " />
            <Section name="S_76206" ID="76206.100004300" title="Comments">
                <ChildItems>
                    <Question name="q_akg1" ID="q_akg1" title="Comments">
                        <ResponseField>
                            <Response name="rsp_akg1">
                                <string name="str_akg1" />
                            </Response>
                        </ResponseField>
                    </Question>
                </ChildItems>
            </Section>
            </ChildItems>
    </Body>
	<Footer name="footer" ID="Footer.LungSurgCCO.357_1.0.0.DRAFT_sdcFDF">
		<Property type="meta" styleClass="copyright" propName="CopyrightFooter" val="(c) 2018 College of American Pathologists.  All rights reserved.  License required for use." />
	</Footer>
</FormDesign>
`;

describe('form', async function() {
    let originalTimeout: number;

    beforeEach(function (done) {
        database.use();
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
        done();
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      });

    it('posting', async function(done) {
        const form = await request(server).post('/api/form').send({id:"post-form-test", input:{id:"post-form-test",procedureID:"777.000", docType:"SDCForm", sectionIDs: []}})
        expect(form.status).toEqual(200);
        expect(form.ok).toBeTruthy();
        expect(form.body[0].id).toContain("post-form-test")
        expect(form.body[0].procedureID).toContain("777.000")
        expect(form.body[0].docType).toContain("SDCForm")
        expect(form.text).toContain(`"_rev"`)
        done();
    });

    it('parsing', async function(done) {
        const form = await request(server).post('/api/upload/form').send({id:"parse-form-test", input:{id:"parse-form-test", xml: xml}})
        expect(form.status).toEqual(200);
        expect(form.ok).toBeTruthy();
        expect(form.body[0]._id).toContain("parse-form-test")
        expect(form.body[0].procedureID).toContain("parse-form-test")
        expect(form.body[0].docType).toContain("SDCForm")

        expect(form.body[1]._id).toContain("parse-form-test-76206.100004300")
        expect(form.body[1].title).toContain("Comments")
        expect(form.body[1].docType).toContain("SDCSection")

        expect(form.body[2].id).toContain("q_akg1")
        expect(form.body[2].superSectionID).toContain("parse-form-test-76206.100004300")
        expect(form.body[2].response.responseType).toContain("text")
        expect(form.body[2].title).toContain("Comments")
        expect(form.body[2].docType).toContain("SDCQuestion")

        expect(form.text).toContain(`"_rev"`)
        done();
    });

});

// const endpoint = 'http://localhost:5000/api/form';
// beforeEach(function (done) {
//     serverInstance = server.run(done);
// });

// afterEach(function (done) {
//     serverInstance.close(done);
// });
// describe('loading express', function () {

//     it('responds to /', function testSlash(done) {
//     request(server)
//       .get('/api/form', )
//       .expect(200, done);
//     });
//   });
    // describe('form', () => {
    //   it('posting form', (done) => {
    //     request(server)
    //         .post('/api/form')
    //         .send({id:'test11', input:{id:"test11", name:"ewrwerew"}})
    //         .expect(200)
    //         .expect('Content-Type', 'application/json')
    //         .end((error) => (error) ? done.fail(error) : done());
    //   });
    // });

