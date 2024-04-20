package com.example.laptopwebsitebackend.service;

import com.example.laptopwebsitebackend.entity.Configuration;
import com.example.laptopwebsitebackend.entity.Discount;
import com.example.laptopwebsitebackend.entity.Product;
import com.example.laptopwebsitebackend.repository.ConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ConfigurationService {

    @Autowired
    private ConfigurationRepository configurationRepository;

    public List<Configuration> getListAllConfiguration(){
        return configurationRepository.findAll();
    }

    public Configuration addNewConfiguration(Configuration configuration){
        return configurationRepository.save(configuration);
    }

    public void deleteConfiguration(Long configuration_id){
        configurationRepository.deleteById(configuration_id);
    }

    public Configuration updateConfiguration(Configuration configuration, Long configuration_id){
        Configuration dbConfiguration = this.configurationRepository.findById(configuration_id).
                orElseThrow(() -> new RuntimeException("Could not find request"));

        if(configuration.getRam() > 4 && !Objects.equals(dbConfiguration.getRam(),configuration.getRam())){
            dbConfiguration.setRam(configuration.getRam());
        }

        if(configuration.getProcessor() != null && configuration.getProcessor().length()>0
                && !Objects.equals(dbConfiguration.getProcessor(),configuration.getProcessor())){
            dbConfiguration.setProcessor(configuration.getProcessor());
        }

        if(configuration.getScreen() > 13 && !Objects.equals(dbConfiguration.getScreen(),configuration.getScreen())){
            dbConfiguration.setScreen(configuration.getScreen());
        }

        if(configuration.getMemory() >= 128 && !Objects.equals(dbConfiguration.getMemory(),configuration.getMemory())){
            dbConfiguration.setMemory(configuration.getMemory());
        }

        if(configuration.getGraphicCard() !=null && configuration.getGraphicCard().length()>0
                && !Objects.equals(dbConfiguration.getGraphicCard(),configuration.getGraphicCard())){
            dbConfiguration.setGraphicCard(configuration.getGraphicCard());
        }

        return configurationRepository.save(dbConfiguration);
    }

    public Configuration findConfiguration(Long configuration_id){
        Configuration configuration = configurationRepository.findById(configuration_id)
                .orElseThrow(() -> new RuntimeException("Configuration is not exist with given id: " + configuration_id));

        return configuration;
    }
}
