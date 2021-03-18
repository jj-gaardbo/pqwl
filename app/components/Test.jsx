import React from 'react';
import { ReactSortable } from "react-sortablejs";
import axios from 'axios';
import $ from 'jquery';

export default class Test extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            language:'en',
            gender: null,
            age: null,
            jobtype: null,
            date: new Date(),
            list: [
                { id: "1", nameEN: "Adequate and fair Compensation", nameDA: "Tilstrækkelig og rimelig kompensation", descEN: "Pay, Salary, Fair Pay, Compensation, Monetary and Non- monetary compensation", descDA: "Betaling, Løn, Fair Betaling, Kompensation, Monetær og Ikke- monetær kompensation" },
                { id: "2", nameEN: "Opportunities for Growth", nameDA: "Muligheder for vækst", descEN: "Career Development, Training, Training and Development, Career prospect, Promotion opportunities, Learning, Growth & advancement", descDA: "Karriereudvikling, Træning, Træning og udvikling, Karriere udsigt, Mulighed for forfremmelse, Læring, Vækst & fremgang" },
                { id: "3", nameEN: "Safe & Healthy Working Condition", nameDA: "Sikre og sunde arbejdsvilkår", descEN: "Physical environment, Working Condition, Ergonomics, Environment, Healthy Physical Condition, Work environment", descDA: "Fysisk miljø, Arbejdsvilkår, Ergonomi, Miljø, Sunde fysiske vilkår, Arbejdsmiljø" },
                { id: "4", nameEN: "Social integration & Cohesiveness", nameDA: "Social integration og samhørighed", descEN: "Interaction, Social aspect of work, work group relation, Community, Relation with boss, Union-Management Relation, Relation & Cooperation, Social relation, Cooperation, Relations with superior, Relation with co-worker, Human Relation", descDA: "Interaktion, Arbejdets sociale aspekt, arbejdsgruppeforhold, Fællesskab, Forhold til leder, Foreningsrelationer, Forhold og samarbejde, Sociale relationer, Samarbejde, Relation med overordnet, Relation med kollega, Menneskelig Relation"},
                { id: "5", nameEN: "Work & Total Life space", nameDA: "Balance mellem privat- og arbejdsliv", descEN: "Balance of  Work and Life, Work Life Balance, Time for Family and Social Obligations, Friends and Family, Family life, Home-work Interface, Arbejdsbesættelse", descDA: "Balance mellem arbejds- og privatliv, Arbejdslivs balance, Tid til familie og sociale ansvar, Venner og familie, familieliv, hjemmearbejde, "  },
                { id: "6", nameEN: "Supervisor", nameDA: "Vejledning/tilsynsførende", descEN: "Social support Supervisor, Supervisor Behaviour, Supervision, Supervisory Work, Supervisory treatment of the Staff", descDA: "Social støtte Vejleder, Vejleder opførsel, Vejledning, Tilsynsarbejde, Tilsynsbehandling af personalet"  },
                { id: "7", nameEN: "Human Progress Capacities", nameDA: "Mulighed for menneskelig udvikling", descEN: "Opportunity to use and Develop Human Capacities, skill and knowledge, Skill Development, Knowledge Development, Competency Development,  Development of skill", descDA: "Mulighed for at bruge og udvikle menneskelige kapaciteter, dygtighed og viden, Færdighedsudvikling, Videnudvikling, Kompetenceudvikling,  Udvikling af dygtighed"},
                { id: "8", nameEN: "Constitutionalism, Justice and Equity", nameDA: "Arbejdskultur mht. sexchikane, diskrimination etc.", descEN: "Constitutionalism in working environment, Work ethics, Nature of Justice and equity, Grievance handling, Sexual Harassment and Discrimination, Fairness at work", descDA: "Konstitutionalisme i arbejdsmiljø, Arbejdsetik, Retfærdighedsnatur, Klagehåndtering, Seksuel chikane og diskrimination, Retfærdighed på arbejdspladsen"},
                { id: "9", nameEN: "Rewards and Recognition", nameDA: "Belønninger og anerkendelse", descEN: "Recognition of efforts, Appreciation of the task, Recognition through promotion, Rewards, Recognition", descDA: "Anerkendelse af indsats, Påskønnelse af opgaver, Anerkendelse gennem forfremmelse, Belønninger, Anerkendelse"  },
                { id: "10", nameEN: "Job Security", nameDA: "Job sikkerhed", descEN: "Security of Job, Employment security", descDA: "Job sikkerhed, Beskæftigelsessikkerhed"},
                { id: "11", nameEN: "Autonomy & control at work", nameDA: "Autonomi og kontrol på arbejdspladsen", descEN: "Autonomy at work, Task Control, Responsibility, Skill Discretion, job control", descDA: "Autonomi på arbejdspladsen, Opgavekontrol, Ansvar, Færdighedsskøn, job kontrol"  },
                { id: "12", nameEN: "Participation in decision-making", nameDA: "Deltagelse i beslutningstagning", descEN: "Employee participation, Decision latitude,  Involvement of employee Decision authority", descDA: "Medarbejder deltagelse, Plads til beslutning,  Involvering af medarbejderens beslutningsmyndighed"  },
                { id: "13", nameEN: "Communication", nameDA: "Kommunikation", descEN: "Communication , Two-way Communication, Open communication, work group communication, Organizational communication, Communication between managers and Employees, Communication between man and man", descDA: "Kommunikation , To-vejs Kommunikation, Åben kommunikation, Arbejdsgruppekommunikation, Organisatorisk kommunikation, Kommunikation mellem ledere og medarbejdere, Mand-til-mand kommunication"},
                ],
            order: []
        };

        this.shuffle = this.shuffle.bind(this);
        this.onChangeJobtype = this.onChangeJobtype.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeJobtype(e){
        this.setState({jobtype:e.target.value})
    }

    onChangeGender(e){
        this.setState({gender:e.target.value})
    }

    onChangeAge(e){
        this.setState({age:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const data = {
            gender: this.state.gender,
            age: this.state.age,
            language: this.state.language,
            jobtype: this.state.jobtype,
            order: this.state.order,
            date: this.state.date
        }

        axios.post('http://87.57.231.47:5000/data/add', data)
            .then(res => console.log(res.data));
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    componentDidMount() {
        let self = this;
        this.setState({list: this.shuffle(this.state.list)});

        $('.sorting-list').on('change', function(){
            let order = [];
            let $listItem = $('.list-item');
            $listItem.children('span').css({'visibility':'visible'});
            for(let i = 0; i < $listItem.length; i++){
                let id = $($listItem[i]).data('number');
                order.push(id);
            }
            self.setState({'order': order});
        });

        $('.sorting-list').mousedown(function(){
            $(this).find('span').css({'visibility':'hidden'});
        });

        $(document).find('#demographic').on('change', function(){
            let age = $(this).find('input[name=flexRadioAge]:checked').val();
            let gender = $(this).find('input[name=flexRadioGender]:checked').val();
            let jobtype = $(this).find('input[name=textJobType]').val();
            self.setState(
                {gender: gender}
            );
            self.setState(
                {age: age}
            );
            self.setState(
                {jobtype: jobtype}
            );
        });
    }

    render() {
        return (
            <div className="main-wrapper">
                <header>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6 language">
                                <button className={`lan-en btn ${this.state.language === 'en' ? 'btn-warning' : 'btn-info'}`}  onClick={() => this.setState({language: 'en'})}>
                                    English
                                </button>
                                <button className={`lan-da btn ${this.state.language === 'da' ? 'btn-warning' : 'btn-info'}`} onClick={() => this.setState({language: 'da'})}>
                                    Dansk
                                </button>
                            </div>

                            <div className="col-md-6">
                                <button onClick={this.onSubmit} className="btn btn-warning"> {/*disabled={!(this.state.page === 4)}*/}
                                    {this.state.language === 'en' ? (
                                        <p>Submit</p>
                                    ) : (
                                        <p>Send</p>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </header>
                <form id={'demographic'}>
                    <div className={'row form-wrapper'}>
                        <div className="col-md-12 col-sm-12">
                            <h1>
                                {this.state.language === 'en' ? (
                                    'What is important for you in your work?'
                                ) : (
                                    'Hvad er vigtigt for dig i dit arbejde?'
                                )}
                            </h1>
                            <div className="form-group">
                                <h2>
                                    {this.state.language === 'en' ? (
                                        'What is your gender?'
                                    ) : (
                                        'Hvad er dit køn?'
                                    )}
                                </h2><br/>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioGender" id="gender-input-m" value={'male'}/>
                                        <label className="form-check-label" htmlFor="gender-input-m">
                                            {this.state.language === 'en' ? (
                                                'Male'
                                            ) : (
                                                'Mand'
                                            )}
                                        </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioGender" id="gender-input-f" value={'female'}/>
                                    <label className="form-check-label" htmlFor="gender-input-f">
                                        {this.state.language === 'en' ? (
                                            'Female'
                                        ) : (
                                            'Kvinde'
                                        )}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioGender" id="gender-input-o" value={'other'}/>
                                    <label className="form-check-label" htmlFor="gender-input-o">
                                        {this.state.language === 'en' ? (
                                            'Other'
                                        ) : (
                                            'Andet'
                                        )}
                                    </label>
                                </div>
                                <hr/>
                            </div>

                            <div className="form-group">
                                <h2>
                                    {this.state.language === 'en' ? (
                                        'What age range are you in?'
                                    ) : (
                                        'Hvilken aldersgruppe hører du til?'
                                    )}
                                </h2> <br/>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioAge" id="age-input-0-19" value={'0-19'}/>
                                    <label className="form-check-label" htmlFor="age-input-0-19">
                                        Under 19
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioAge" id="age-input-20-39" value={'20-39'}/>
                                    <label className="form-check-label" htmlFor="age-input-20-39">
                                        20-39
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioAge" id="age-input-40-59" value={'40-59'}/>
                                    <label className="form-check-label" htmlFor="age-input-40-59">
                                        40-59
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioAge" id="age-input-60-79" value={'60-79'}/>
                                    <label className="form-check-label" htmlFor="age-input-60-79">
                                        60-79
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioAge" id="age-input-80plus" value={'80+'}/>
                                    <label className="form-check-label" htmlFor="age-input-80plus">
                                        80+
                                    </label>
                                </div>
                                <hr/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="job-type">
                                    {
                                        this.state.language === 'en' ? (
                                            "Job type (I work in an office environment, I'm doing production work at a factory, I'm a social worker, I'm in the service sector etc.)"
                                        ) : (
                                            "Job type (Jeg arbejder på et kontor, Jeg er fabriksarbejder, Jeg er arbejder med social- og sundhed, Jeg er i service sektoren etc.)"
                                        )
                                    }
                                </label>
                                <input name={'textJobType'} type="text" className="form-control" id="job-type"  placeholder={
                                    this.state.language === 'en' ? (
                                        "Describe, in a few words, your type of job"
                                    ) : (
                                        "Beskriv, med få ord, hvilken type arbejde du har"
                                    )
                                } />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 ranking">
                            <h2>
                                {
                                    this.state.language === 'en' ? (
                                        "Rank these work factors in an order corresponding to your own personal priorities. (Drag-and-drop the items in the list so that they are ordered according to your priorities. Mouseover the items for more explanation.)"
                                    ) : (
                                        "Ranger disse arbejds faktorer i en rækkefølge, der passer til dine egne personlige prioriteringer. (Træk og slip punkterne i listen så de er sorteret efter dine prioriteter. Hold musen over punkterne for mere forklaring.)"
                                    )
                                }
                            </h2>
                            <ReactSortable className={'list-group sorting-list'}
                                list={this.state.list}
                                setList={(newState) => this.setState({ list: newState })}
                            >
                                {this.state.list.map((item, index) => (
                                    <div className={'list-group-item list-item'} key={item.id} data-number={item.id} title={this.state.language === 'en' ? item.descEN : item.descDA}>
                                        <span>{index+1}</span>
                                        {
                                            this.state.language === 'en' ? (
                                                item.nameEN
                                            ) : (
                                                item.nameDA
                                            )
                                        }
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
